import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
  Button,
  ActivityIndicator,
  Image,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/store";
import { increment, decrement } from "./actions/counterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Reactotron from "reactotron-react-native"

export default function CounterScreen({ route, navigation }: any) {

  const count = useAppSelector((state: RootState) => state.counter.value)
  const dispatch = useAppDispatch()
  return (

    <View style={{ flex: 1, }}>
      <>
        {Reactotron.log("something really interesting happened")
        }

      </>
      {/* <Button title="Increase By 1" onPress={() => dispatch(increment())} />
        <Button title="Decrease By 1" onPress={() => dispatch(decrement())} /> */}
    </View>
  );
}
