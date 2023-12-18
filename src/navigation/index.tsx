import React, {  useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, View, useColorScheme } from "react-native";
import TabNavigator from "@navigation/tab-navigator";
import ExampleScreen from "@styles/examples";


function ApplicationNavigator() {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Text    style={{}}>is Loading</Text>;
  }

 
  return (
    <NavigationContainer >

       {/* For seeing the styles used in our example e.g Typography, Colors, Spacing. */}
       {/* <ExampleScreen/> */}
      <TabNavigator/>


      {/* If we wanted to use some kind of an auth feature. This navigator bellow should be useful */}
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn != false ? (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="AppNavigator" component={AppNavigator} />
        )}
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
