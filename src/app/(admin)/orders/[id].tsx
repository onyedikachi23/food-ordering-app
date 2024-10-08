/** @format */

import orders from "@/assets/data/orders";
import { useOrderDetails, useUpdateOrder } from "@/src/api-hooks/orders";
import OrderItemListItem from "@/src/components/order-item-list-item";
import OrderListItem from "@/src/components/orders-list-item";
import Colors from "@/src/constants/Colors";
import { notifyUserAboutOrderUpdate } from "@/src/lib/notifications";
import { OrderStatusList } from "@/src/types";
import { Stack, useLocalSearchParams } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	Text,
	View,
} from "react-native";

export default function OrderDetailsScreen() {
	const { id: idString } = useLocalSearchParams();
	const id = parseInt(typeof idString === "string" ? idString : idString[0]);

	const { data: order, isLoading, error } = useOrderDetails(id);
	const { mutate: updateOrder } = useUpdateOrder();

	async function updateStatus(status: string) {
		await updateOrder({
			id: id,
			updatedFields: { status },
		});

		console.warn("Notify", order?.user_id);
		if (order) await notifyUserAboutOrderUpdate({ ...order, status });
	}

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error || !order) {
		return <Text>Failed to fetch</Text>;
	}

	console.log(order);

	return (
		<View style={{ padding: 10, gap: 10, flex: 1 }}>
			<Stack.Screen options={{ title: `Order #${id}` }} />

			<OrderListItem order={order} />

			{/* placed orders */}
			<FlatList
				data={order.order_items}
				renderItem={({ item }) => <OrderItemListItem item={item} />}
				contentContainerStyle={{ gap: 10 }}
				ListFooterComponent={() => (
					<>
						<Text style={{ fontWeight: "bold" }}>Status</Text>
						<View style={{ flexDirection: "row", gap: 5 }}>
							{OrderStatusList.map((status) => (
								<Pressable
									key={status}
									onPress={() => updateStatus(status)}
									style={{
										borderColor: Colors.light.tint,
										borderWidth: 1,
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
										backgroundColor:
											order.status === status
												? Colors.light.tint
												: "transparent",
									}}>
									<Text
										style={{
											color:
												order.status === status
													? "white"
													: Colors.light.tint,
										}}>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				)}
			/>
		</View>
	);
}
