import React, { useEffect, useState } from 'react';
import { Animated, SafeAreaView, View,Image } from 'react-native';
import AppNavigator from './navigation';
import 'react-native-gesture-handler';
import { store } from "@store/store"
import { Provider } from "react-redux"
import "react-native-devsettings/withAsyncStorage";
import BootSplash from "react-native-bootsplash";
import { AnimatedBootSplash } from '@components/index';

/* for using Reactron debugging tool, more info at https://github.com/infinitered/reactotron */
if (__DEV__) {
  import("@config/reactotron-config").then(() => console.log("Reactotron Configured"));
}


function App(): JSX.Element {

  const [visible, setVisible] = useState(true);

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppNavigator />
        </SafeAreaView>
      </Provider>
      {visible && (
        <AnimatedBootSplash
          onAnimationEnd={() => {
            setVisible(false);
          }}
        />
      )}
    </View>
  )
  
}

export default App;
