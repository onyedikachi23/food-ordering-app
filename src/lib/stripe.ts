import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import { supabase } from "./supabase";
import { Alert } from "react-native";

const fetchPaymentSheetParams = async (amount: number) => {
    const { data, error } = await supabase.functions.invoke("payment-sheet", {
        body: { amount }
    })

    if (data) {
        return data;
    }

    Alert.alert("Error fetching payment sheet params");
    return {};
};

const initializePaymentSheet = async (amount: number) => {
  console.warn(`initializePaymentSheet for ${amount}`);

    const { paymentIntent, publishableKey } = fetchPaymentSheetParams(amount)
    
    if (!paymentIntent || !publishableKey) {
        return;
    }

    await initPaymentSheet({
        merchantDisplayName: "NerdyCooks",
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 555-5555",
        }
    })
    
};

export const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
        Alert.alert(error.message)
        return false;
    }

    return true;
}

export default  initializePaymentSheet;
