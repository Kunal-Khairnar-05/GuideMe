import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import Colors from "../utils/Colors";
import CourseList from "../Components/HomeScreen/CourseList";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import { useNavigation, useRoute } from "@react-navigation/native";
import OptionItem from "../Components/CourseDetailScreen/OptionItem";
import { useAppContext } from "../../AppContext";
const API_URL = "http://192.168.20.243:3001";

const StripeApp_1 = () => {
  const [email, setEmail] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();
  const navigation = useNavigation();
  const { setScheduler } = useAppContext();

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { clientSecret, error } = await response.json();
      return { clientSecret, error };
    } catch (error) {
      console.log("Error fetching payment intent:", error);
      return { error };
    }
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter complete card details and email.");
      return;
    }

    const billingDetails = {
      email: email,
    };

    try {
      const { clientSecret, secretError } =
        await fetchPaymentIntentClientSecret();
      if (secretError) {
        console.error(
          "Unable to fetch payment intent client secret:",
          secretError
        );
        throw new Error("Failed to fetch payment intent client secret.");
      }

      const { paymentIntent, confirmError } = await confirmPayment(
        clientSecret,
        {
          type: "Card",
          billingDetails: billingDetails,
          paymentMethodType: "Card", // Ensure correct payment method type is provided
          paymentMethodOptions: {
            card: {
              requestThreeDSecure: "any",
            },
          },
        }
      );

      console.log("Payment successful", paymentIntent);
      alert("Payment successful");
      setScheduler(true);
      navigation.navigate("Schedule");
    } catch (e) {
      console.error("Error handling payment:", e);
      alert("Error handling payment. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter Card Details 💳</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{ number: "4242 4242 4242 4242" }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <Button
        style={styles.button}
        onPress={handlePayPress}
        title="Pay"
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    marginTop: 100,
    marginBottom: 250,
    borderRadius: 20,
  },
  text: {
    color: Colors.PRIMARY,
    fontSize: 20,
    height: 50,
    padding: 10,
    marginBottom: 20,
    fontFamily: "outfit-bold",
  },
  button: {
    marginTop: 50,
  },
  input: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#efefef",
    borderRadius: 8,
  },
  cardContainer: {
    height: 50,
    marginTop: 20,
    marginBottom: 30,
  },
});

export default StripeApp_1;
