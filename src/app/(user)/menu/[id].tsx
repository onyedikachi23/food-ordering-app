/** @format */

import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Button from "@/src/components/button";
import { useCart } from "@/src/context-providers/cart-provider";
import { PizzaSize } from "@/src/types";

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
			<Stack.Screen options={{ title: product?.name }} />
			<Image
				style={styles.image}
				source={{ uri: product.image || defaultPizzaImage }}
			/>

			{/* size select section */}
			<Text>Select size</Text>
			<View style={styles.sizes}>
				{sizes.map((size) => (
					<Pressable
						key={size}
						onPress={() => setSelectedSize(size)}
						style={[
							styles.size,
							{
								backgroundColor:
									selectedSize === size
										? "gainsboro"
										: "white",
							},
						]}>
						<Text
							style={[
								styles.sizeText,
								{
									color:
										selectedSize == size ? "black" : "gray",
								},
							]}>
							{size}
						</Text>
					</Pressable>
				))}
			</View>

			<Text style={styles.price}>${product.price}</Text>
			<Button onPress={addToCart} text="Add to cart" />
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
	price: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: "auto",
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
