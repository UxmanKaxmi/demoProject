import { AppScreenProps } from "_navigation/types";
import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
  Button,
} from "react-native";

export default function AboutScreen({ route, navigation }: AppScreenProps<"About">) {
  return (
    <View style={{ flex: 1, backgroundColor: "blue" }}>
      <Text>ABOUT SCREEN</Text>
      <Button title="GOTO HOME" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
