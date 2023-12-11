import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@screens/login-screen";
import { AuthScreensList } from "@navigation/navigation.types";
import CounterScreen from "@features/counter";

const Stack = createStackNavigator<AuthScreensList>();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Counter"
        component={CounterScreen}
        options={{
          title: "Counter",

        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Sign in",
          // When logging out, a pop animation feels intuitive
          // You can remove this if you want the default 'push' animation
          //   animationTypeForReplace: state.isSignout ? 'pop' : 'push',
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
