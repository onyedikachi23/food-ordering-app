/** @format */

import { useOrderDetails } from "@/src/api-hooks/orders";
import { useUpdateOrderSubscriptions } from "@/src/api-hooks/orders/subscriptions";
import OrderItemListItem from "@/src/components/order-item-list-item";
import OrderListItem from "@/src/components/orders-list-item";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function OrderDetailsScreen() {
	const { id: idString } = useLocalSearchParams();
	const id = parseInt(typeof idString === "string" ? idString : idString[0]);

	const { data: order, isLoading, error } = useOrderDetails(id);
	useUpdateOrderSubscriptions(id);

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch</Text>;
	}

	return (
		<View style={{ padding: 10, gap: 10, flex: 1 }}>
			<Stack.Screen options={{ title: `Order #${id}` }} />

			<OrderListItem order={order} />

			{/* placed orders */}
			<FlatList
				data={order.order_items}
				renderItem={({ item }) => <OrderItemListItem item={item} />}
				contentContainerStyle={{ gap: 10 }}
			/>
		</View>
	);
}
