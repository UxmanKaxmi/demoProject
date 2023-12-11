/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import AppNavigator from './navigation';
import 'react-native-gesture-handler';
import { store } from "@store/store"
import { Provider } from "react-redux"

//for using Reactron debuggiing tool, more info at //https://github.com/infinitered/reactotron
if (__DEV__) {
  import("@config/reactotron-config").then(() => console.log("Reactotron Configured"));
}
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
