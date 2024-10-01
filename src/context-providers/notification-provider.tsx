/** @format */

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import registerForPushNotificationsAsync from "../lib/notifications";
import { ExpoPushToken, setNotificationHandler } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { supabase } from "../lib/supabase";
import { useAuth } from "./auth-provider";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
	const [expoPushToken, setExpoPushToken] = useState<String | undefined>();

	const { profile } = useAuth();

	const [notification, setNotification] = useState<
		Notifications.Notification | undefined
	>(undefined);
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();

	const savePushToken = async (newToken: string | undefined) => {
		setExpoPushToken(newToken);

		if (!newToken) return;

		// update token in database
		await supabase
			.from("profiles")
			.update({
				expo_push_token: newToken,
			})
			.eq("id", profile.id);
	};

	useEffect(() => {
		registerForPushNotificationsAsync()
			.then((token) => savePushToken(token))
			.catch((error: any) => setExpoPushToken(`${error}`));

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response);
				}
			);

		return () => {
			notificationListener.current &&
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			responseListener.current &&
				Notifications.removeNotificationSubscription(
					responseListener.current
				);
		};
	}, []);

	console.warn("Push token: ", expoPushToken);
	console.warn("Notification: ", notification);

	return <>{children}</>;
};

export default NotificationProvider;
