/** @format */

import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { supabase } from "@/src/lib/supabase";

const ProfileScreen = () => {
	return (
		<View>
			<Text style={{ color: "white" }}>Profile</Text>

			<Button
				title="Sign out"
				onPress={async () => await supabase.auth.signOut()}
			/>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({});
