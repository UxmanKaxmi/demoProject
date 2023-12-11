import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@screens/home-screen";
import AboutScreen from "@screens/about-screen";

import { AppScreensList } from "@navigation/navigation.types";
import CharacterScreen from "@screens/character-screen";

const Stack = createStackNavigator<AppScreensList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Character"
        component={CharacterScreen}
        options={{
          title: "About",
        }}
      />
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
