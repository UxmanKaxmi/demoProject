import React from "react";
import {
  
    View,
} from "react-native";
import { AppScreenProps } from "@navigation/navigation.types";
import {  Sizing } from "@styles/index";
import { LocationList } from "features/location";


export const LocationScreen = ({ }: AppScreenProps<"Location">
) => {

    return (
        <View style={{ flex: 1, width: Sizing.screen.width, height: Sizing.screen.height }}>
        <LocationList />

        </View>
    );
}
