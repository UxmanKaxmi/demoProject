import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text, } from "react-native";
import TabNavigator from "@navigation/tab-navigator";

import BottomSheetComponent from "components/bottom-sheet/filter-sheet";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from "./navigation.types";
import { Colors } from "styles";
import { DetailCharacterScreen, DetailLocationScreen, } from "screens";

const Stack = createNativeStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);


  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Text style={{}}>is Loading</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{
        }}>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{
              headerShown: false,
              contentStyle: { backgroundColor: Colors.neutral.white }
            }}

          />
           <Stack.Screen
            name="DetailCharacter"
            component={DetailCharacterScreen}
            
            options={{
              headerBackTitle:"Back",
              headerShown: true,
              contentStyle: { backgroundColor: Colors.neutral.white }
            }}
            // initialParams={{ id:0 }}


          />
            <Stack.Screen
            name="DetailLocation"
            component={DetailLocationScreen}
            
            options={{
              headerBackTitle:"Back",
              headerShown: true,
              contentStyle: { backgroundColor: Colors.neutral.white }
            }}
            // initialParams={{ id:0 }}


          />
        </Stack.Group>

      {/* added Stack Navigator to show the modals */}
        <Stack.Group screenOptions={{
          presentation: "formSheet",
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          }

        }}>
          <Stack.Screen name="FilterModal" component={BottomSheetComponent} />
        </Stack.Group>

      </Stack.Navigator>


      {/* For seeing the styles used in our example e.g Typography, Colors, Spacing. */}
      {/* <ExampleScreen/> */}


      {/* If we wanted to use some kind of an auth feature. This navigator bellow should be useful */}
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn != false ? (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="AppNavigator" component={AppNavigator} />
        )}
      </Stack.Navigator> */}

    </NavigationContainer >
  );
}

export default ApplicationNavigator;
