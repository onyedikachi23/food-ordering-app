/** @format */

import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { useCart } from "../context-providers/cart-provider";
import CartListItem from "../components/cart-list-item";

const CartScreen = () => {
	const { items } = useCart();

	return (
		<View>
			<FlatList
				data={items}
				renderItem={({ item }) => <CartListItem cartItem={item} />}
				contentContainerStyle={{
					padding: 10,
					gap: 10,
				}}></FlatList>

			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
};

export default CartScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
	},
});
