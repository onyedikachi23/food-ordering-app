/** @format */

import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/order-item-list-item";
import OrderListItem from "@/src/components/orders-list-item";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function OrderDetailsScreen() {
	const { id } = useLocalSearchParams();

	const order = orders.find((order) => order.id.toString() === id);

	if (!order) {
		return <Text>Not found</Text>;
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
