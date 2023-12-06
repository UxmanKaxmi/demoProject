import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "_screens/home";
import AboutScreen from "_screens/about";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
        }}
      />
    </Stack.Navigator>
  );
}
