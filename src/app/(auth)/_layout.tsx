/** @format */

import { useAuth } from "@/src/context-providers/auth-provider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
	const { session } = useAuth();

	// if user is already signed in, he can't be here, so redirect to home screen
	if (session) {
		return <Redirect href={"/"} />;
	}

	return <Stack />;
}
