import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/about';
import AboutScreen from '../screens/home';
import {Text} from 'react-native';
import LoginScreen from '../screens/login';
// import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';

const Stack = createStackNavigator();

function ApplicationNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <Text>is LLOADING</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn == false ? (
          <Stack.Screen name="Auth Navigator" component={AuthNavigator} />
        ) : (
          <Stack.Screen name="App Navigator" component={AppNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
