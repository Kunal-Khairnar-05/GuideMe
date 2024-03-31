import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreenNavigation from "./HomeScreenNavigation";
import MyCourse from "../Screens/MyCourse";
import LeaderBoard from "../Screens/LeaderBoard";
import ProfileScreen from "../Screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppContext } from "../../AppContext";
import MyTasks from "../Screens/MyCourse";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { scheduler } = useAppContext();
  const { myTasks } = useAppContext();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      {myTasks && (
        <Tab.Screen
          name="MyTasks"
          component={MyTasks}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="tasks" size={24} color={color} />
            ),
          }}
        />
      )}

      {scheduler && (
        <Tab.Screen
          name="Schedule"
          component={LeaderBoard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="schedule" size={24} color={color} />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="man" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
