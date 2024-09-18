/** @format */

import "react-native-url-polyfill/auto";
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		SecureStore.deleteItemAsync(key);
	},
};

const supabaseUrl = "https://ealwnapjcnfqplfvitsu.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhbHduYXBqY25mcXBsZnZpdHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNTY4OTQsImV4cCI6MjA0MTgzMjg5NH0.XVNyRHj-NlD2Km4JRf5Ue-b-oWrZH5E8919oxAgbsJs";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: ExpoSecureStoreAdapter as any,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
