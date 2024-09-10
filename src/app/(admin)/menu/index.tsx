/** @format */

import Colors from "@/src/constants/Colors";

import { FlatList, View } from "react-native";
import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";

const product = products[1];

export default function MenuScreen() {
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
