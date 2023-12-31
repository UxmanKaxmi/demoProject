import React from "react";
import {
    View,
} from "react-native";
import { CharacterList } from "@features/character/component/character-list";
import { Sizing } from "@styles/index";


export const CharacterScreen = () => {
    return (
        <View style={{ flex: 1, width: Sizing.screen.width, height: Sizing.screen.height }}>
            <CharacterList />
        </View>
    );
}
