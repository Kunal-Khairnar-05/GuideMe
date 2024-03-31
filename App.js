import { StatusBar } from "expo-status-bar";
import { AppContext } from "./AppContext";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import LoginScreen from "./App/Screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import React, { useState } from "react";
import { AppLoading } from "expo";
import TabNavigation from "./App/Navigation/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { SP_KEY } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Provider } from "react";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-Medium.ttf"),
    "outfit-semibold": require("./assets/fonts/Outfit-SemiBold.ttf"),
  });
  const [scheduler, setScheduler] = useState(false);
  const [myTasks, setMyTasks] = useState(false);
  return (
    <ClerkProvider
      publishableKey={"pk_test_ZHJpdmVuLXBpa2EtNTIuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    >
      <AppContext.Provider value={{ scheduler, setScheduler,myTasks,setMyTasks }}>
        
        <View style={styles.container}>
          <SignedIn>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </SignedIn>

          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </View>
      </AppContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7EEDD",
    marginTop: 30,
  },
});
