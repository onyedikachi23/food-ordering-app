/** @format */

import { useAdminOrdersList } from "@/src/api-hooks/orders";
import OrderListItem from "@/src/components/orders-list-item";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrderScreen() {
	const {
		data: orders,
		isLoading,
		error,
	} = useAdminOrdersList({ archived: false });

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
