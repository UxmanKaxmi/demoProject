import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import AppNavigator from "_navigation/app-navigator";
import AuthNavigator from "_navigation/auth-navigator";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Text>is LLOADING</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn != false ? (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="AppNavigator" component={AppNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
