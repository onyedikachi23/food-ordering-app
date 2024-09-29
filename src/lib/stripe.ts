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

export const initializePaymentSheet = async (amount: number) => {
  
    const { paymentIntent, publishableKey, customer, ephemeralKey } = fetchPaymentSheetParams(amount)
    
    if (!paymentIntent || !publishableKey) {
        return;
    }

    const { error } = await initPaymentSheet({
        merchantDisplayName: "NerdyCooks",
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        defaultBillingDetails: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 555-5555",
        }
        
    });

    if (error) {
        console.warn(error);
    }
    
};

export const openPaymentSheet = async () => {

    const { error } = await presentPaymentSheet();

    if (error) {
        Alert.alert(error.message)
        console.warn(error);
        
        return false;
    }

    return true;
}

 
