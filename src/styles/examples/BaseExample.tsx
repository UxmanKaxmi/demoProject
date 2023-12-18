import React, { FunctionComponent } from "react"
import { Pressable, StyleSheet, View, Text } from "react-native"

import { Sizing, Typography, Outlines, Colors, Buttons } from "../"
import { layout, screen } from "@styles/sizing"

import { APP_NAME } from "@env"
const BaseExample: FunctionComponent = () => {
  return (
    <View style={{ padding: Sizing.x40, height: screen.height }}>

      <View style={style.headerContainer}>
        <Text style={style.headerText}>
          React Native Typescript Design guideline for {APP_NAME}
        </Text>
        <Text style={style.subheaderText}>
          We can use these styles throughout the app. The examples are given below.
        </Text>
      </View>
      <View style={style.bodyContainer}>
        <Text style={style.bodyText}>
          React Native has no framework for structuring styles, so I created
          this set of style modules for new React Native projects. While these
          styles are not visually opinionated and can change throughout the lifecycle of the app, the organization of the style
          code is carefully considered.
        </Text>
        <Text style={style.bodyText}>
          The styles are separated by category into modules, including Colors,
          Sizing, and Buttons. Each module contains a set of objects which
          provide styles for a specific kind of thing within the module
          category. For example, the Colors module provides objects for primary
          and neutral colors. Finally, each of these objects itself provides
          key/value pairs for specific styles: in this case, particular primary
          and neutral colors.
        </Text>
      </View>
      <Pressable style={Buttons.applyOpacity(style.button)}>
        <Text style={style.buttonText}>Buttons are Useful</Text>
      </Pressable>
      <Pressable style={Buttons.applyOpacity(style.secondaryButton)}>
        <Text style={style.secondaryButtonText}>
          Not all buttons need a background
        </Text>
      </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
  headerContainer: {
    marginBottom: Sizing.x20,
    paddingBottom: Sizing.x20,
    borderBottomWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s200,
  },
  headerText: {
    ...Typography.header.x60,
    marginBottom: Sizing.x20,
  },
  subheaderText: {
    ...Typography.subheader.x30,
  },
  bodyContainer: {
    marginBottom: Sizing.x20,
  },
  bodyText: {
    ...Typography.body.x20,
    marginBottom: Sizing.x20,
  },
  button: {
    ...Buttons.bar.primary,
    marginBottom: Sizing.x10,
  },
  buttonText: {
    ...Buttons.barText.primary,
  },
  secondaryButton: {
    ...Buttons.bar.secondary,
    marginBottom: Sizing.x10,
  },
  secondaryButtonText: {
    ...Buttons.barText.secondary,
  },
})
export default BaseExample
