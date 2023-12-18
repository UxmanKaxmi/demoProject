import React from "react";
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
    Button,
} from "react-native";
import TypographyExample from "@styles/examples/TypographyExample";
import BaseExample from "@styles/examples/BaseExample";
import ColorExample from "@styles/examples/ColorExample";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

export default function ExampleScreen({

}) {
    return (
        <View
            style={{ flex: 1, width: "100%", height: "100%" }}
        >
            <Tab.Navigator>
                <Tab.Screen
                    name="Buttons"
                    component={BaseExample}
                    options={{

                    }}
                />

                <Tab.Screen
                    name="Colors"
                    component={ColorExample}
                    options={{

                    }}
                />
                <Tab.Screen
                    name="Typography"
                    component={TypographyExample}
                    options={{

                    }}
                />


            </Tab.Navigator>
            

        </View>
    );
}
