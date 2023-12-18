// See https://reactnavigation.org/docs/typescript/#organizing-types for an example. 

import type {
    NavigatorScreenParams,
} from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationState } from "react-native-tab-view";



export type RootStackParamList = {
    // AuthNavigator: NavigatorScreenParams<AuthScreensList>;
    // AppNavigator: NavigatorScreenParams<AppScreensList>;
    TabNavigator:NavigatorScreenParams<TabScreensList>
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;


//When we add a new screen in the app, its type should be mentioned here. 
// export type AuthScreensList = {
//     Counter: undefined
//     Login: undefined;
// };


// export type AppScreensList = {
//     Character: undefined;
//     Home: undefined;
//     About: undefined;
 
// };


export type Route = {
    key: string;
    title: string;
    icon: any;
  };
  export type State = NavigationState<Route>;


export type TabScreensList = {
    Character: undefined;
    Location:undefined;
    Episode:undefined;
   
 
};

export type AppScreenProps<T extends keyof TabScreensList> = NativeStackScreenProps<TabScreensList, T>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

