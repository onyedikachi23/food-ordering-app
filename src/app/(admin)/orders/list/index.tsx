/** @format */

import { useAdminOrdersList } from "@/src/api-hooks/orders";
import { useInsertOrderListener } from "@/src/api-hooks/orders/subscriptions";
import OrderListItem from "@/src/components/orders-list-item";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrderScreen() {
	const {
		data: orders,
		isLoading,
		error,
	} = useAdminOrdersList({ archived: false });

	const queryClient = useQueryClient();

	// subscribe to real time changes
	useInsertOrderListener();

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch</Text>;
	}

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => <OrderListItem order={item} />}
			contentContainerStyle={{
				gap: 10,
				padding: 10,
			}}
		/>
	);
}
