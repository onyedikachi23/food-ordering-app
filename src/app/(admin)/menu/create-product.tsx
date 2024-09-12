/** @format */

import Button from "@/src/components/button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

const CreateProductScreen = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const [errors, setErrors] = useState("");

	// to know if updating or creating the product
	const { id } = useLocalSearchParams();
	const isUpdating = Boolean(id);

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [4, 3],
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		} else {
			alert("You did not select any image.");
		}
	};

	function onCreate() {
		if (!validateInput()) {
			return;
		}
		console.log("creating product");

		// save in the database

		resetFields();
	}

	function onUpdate() {
		if (!validateInput()) {
			return;
		}
		console.log("Updating product");

		// save in the database

		resetFields();
	}

	function resetFields() {
		setName("");
		setPrice("");
	}

	function validateInput() {
		setErrors("");
		if (!name) {
			setErrors("Name is required");
			return false;
		}
		if (!price) {
			setErrors("Price is required");
			return false;
		}

		if (isNaN(parseFloat(price))) {
			setErrors("Price is not a number");
			return false;
		}

		return true;
	}

	function onDelete() {
		console.warn("DELETE!!!");
	}

	function onSubmit() {
		if (isUpdating) {
			onUpdate();
		} else {
			onCreate();
		}
	}

	function confirmDelete() {
		Alert.alert(
			"Confirm",
			"Are you sure you want to delete this product?",
			[
				{
					text: "Cancel",
				},
				{
					text: "Delete",
					style: "destructive",
					onPress: onDelete,
				},
			]
		);
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: isUpdating ? "Update product" : "Create Product",
				}}
			/>

			<Image
				source={{ uri: selectedImage || defaultPizzaImage }}
				style={styles.image}
			/>
			<Text style={styles.textBtn} onPress={pickImageAsync}>
				Select image
			</Text>

			<Text style={styles.label}>Name</Text>
			<TextInput
				value={name}
				onChangeText={setName}
				placeholder="name"
				style={styles.input}
			/>

			<Text style={styles.label}>Price ($)</Text>
			<TextInput
				value={price}
				onChangeText={setPrice}
				placeholder="9.99"
				style={styles.input}
				keyboardType="numeric"
			/>

			<Text style={{ color: "red" }}>{errors}</Text>
			<Button
				text={isUpdating ? "Update" : "Create"}
				onPress={onSubmit}
			/>
			{isUpdating && (
				<Text onPress={confirmDelete} style={styles.textBtn}>
					Delete
				</Text>
			)}
		</View>
	);
};

export default CreateProductScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 10,
	},
	image: {
		width: "50%",
		aspectRatio: 1,
		alignSelf: "center",
		borderRadius: 100,
	},
	textBtn: {
		alignSelf: "center",
		fontWeight: "bold",
		color: Colors.light.tint,
		marginVertical: 10,
	},
	input: {
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 20,
	},
	label: {
		color: "gray",
		fontSize: 16,
	},
});
