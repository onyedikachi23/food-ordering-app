/** @format */

import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import { useCart } from "../context-providers/cart-provider";
import CartListItem from "../components/cart-list-item";
import Button from "../components/button";
import { Text } from "../components/Themed";

const CartScreen = () => {
	const { items, total, checkout } = useCart();

	return (
		<View style={{ padding: 10 }}>
			<FlatList
				data={items}
				renderItem={({ item }) => <CartListItem cartItem={item} />}
				contentContainerStyle={{
					gap: 10,
				}}></FlatList>

			<Text
				style={{
					marginTop: 20,
					fontSize: 20,
					fontWeight: "500",
				}}>
				Total: ${total}
			</Text>
			<Button text="Checkout" onPress={checkout} />

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
