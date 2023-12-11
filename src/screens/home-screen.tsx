import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
  Button,
} from "react-native";
import { AppScreenProps } from "@navigation/navigation.types";
import { API_URL, API_TOKEN } from "@env"


export default function HomeScreen({
  route,
  navigation,
}: AppScreenProps<"Home">) {
  return (
    <View
      style={{ flex: 1, backgroundColor: "red", width: "100%", height: "100%" }}
    >
      <Text>{API_URL}</Text>
      <Button title="PRESS ME" onPress={() => navigation.navigate("About")} />
    </View>
  );
}
