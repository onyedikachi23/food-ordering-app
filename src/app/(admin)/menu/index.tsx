/** @format */

import { useProductsList } from "@/src/api-hooks/products";
import ProductListItem from "@/src/components/ProductListItem";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function MenuScreen() {
	const { data: products, error, isLoading } = useProductsList();

	if (isLoading) {
		return <ActivityIndicator />;
	}

	if (error) {
		return <Text>Failed to fetch products.</Text>;
	}

	return (
		<View>
			<FlatList
				data={products}
				renderItem={({ item }) => <ProductListItem product={item} />}
				numColumns={2}
				contentContainerStyle={{
					gap: 10,
					padding: 10,
				}}
				columnWrapperStyle={{
					gap: 10,
				}}
			/>
		</View>
		/* <ProductListItem product={products[0]} />
			<ProductListItem product={products[1]} /> */
	);
}
