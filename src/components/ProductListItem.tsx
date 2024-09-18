/** @format */ /** @format */

import Colors from "@/src/constants/Colors";
import { Tables } from "@/src/types";
import { Link, useSegments } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

export const defaultPizzaImage =
	"https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
	product: Tables<"products">;
};

export default function ProductListItem({ product }: ProductListItemProps) {
	const segments = useSegments();

	return (
		<Link href={`${segments[0]}/menu/${product.id}`} asChild>
			<Pressable style={styles.container}>
				<Image
					style={styles.image}
					source={{ uri: product.image || defaultPizzaImage }}
					resizeMode="contain"
				/>
				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.price}>${product.price}</Text>
			</Pressable>
		</Link>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 20,
		flex: 1,
		maxWidth: "50%",
	},
	image: { width: "100%", aspectRatio: 1 },
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginVertical: 10,
	},
	price: {
		color: Colors.light.tint,
		fontWeight: "bold",
	},
});
