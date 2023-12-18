import React from "react";
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
    Button,
} from "react-native";
import { AppScreenProps } from "@navigation/navigation.types";
import { CharacterList } from "@features/character/component/character-list";
import { lineHeight } from "@styles/typography";
import { Outlines, Sizing } from "@styles/index";


export const LocationScreen = ({ }: AppScreenProps<"Location">
) => {

    return (
        <View style={{ flex: 1, width: Sizing.screen.width, height: Sizing.screen.height }}>
        </View>
    );
}
