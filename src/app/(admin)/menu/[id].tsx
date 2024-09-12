/** @format */

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/button";
import { useCart } from "@/src/context-providers/cart-provider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
	const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

	const { addItem } = useCart();

	const { id } = useLocalSearchParams();

	const product = products.find((product) => product.id.toString() === id);

	const router = useRouter();

	function addToCart() {
		if (!product) {
			return;
		}

		addItem(product, selectedSize);
		router.push("/cart");
	}

	// in case product was not found
	if (!product) {
		return <Text>Product not found</Text>;
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "Menu",
					headerRight: () => (
						<Link
							href={`/(admin)/menu/create-product?id=${id}`}
							asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="pencil"
										size={25}
										color={Colors.light.tint}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>

			<Stack.Screen options={{ title: product?.name }} />
			<Image
				style={styles.image}
				source={{ uri: product.image || defaultPizzaImage }}
			/>

			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
		padding: 10,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	price: {
		fontSize: 18,
		fontWeight: "bold",
	},

	sizes: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginVertical: 10,
	},
	size: {
		backgroundColor: "gainsboro",
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	sizeText: {
		fontSize: 20,
		fontWeight: "500",
	},
});
