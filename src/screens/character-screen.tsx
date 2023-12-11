import React from "react";
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
    Button,
} from "react-native";
import { AppScreenProps } from "@navigation/navigation.types";
import { CharacterList } from "@features/character/component/characterList";

export default function CharacterScreen({
    route,
    navigation,
}: AppScreenProps<"Character">) {
    return (
        <View
            style={{ flex: 1, width: "100%", height: "100%" }}
        >
            <CharacterList />

        </View>
    );
}
