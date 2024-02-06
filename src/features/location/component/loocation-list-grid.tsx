import { View, Text, TouchableHighlight, StyleSheet, Image, ListRenderItemInfo, Pressable } from 'react-native'
import React, { memo } from 'react';
import { Colors, Outlines, Sizing, Typography } from '@styles/index';
import { useNavigation } from '@react-navigation/native';
import { Result } from '../types/location-types';



const LocationListGrid= ({ item, index, separators }: ListRenderItemInfo<Result>) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => navigation.navigate("DetailLocation", item)}
      style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 },
        styles.cardView
      ]}
      key={index}

    >
      <View style={styles.cardInnerView}>
        <View style={{ flex: 1 }}>
          <Text style={[Typography.header.x10,{marginBottom:Sizing.x5}]}>{item?.name}</Text>
          <Text style={[Typography.fontSize.x1]}>{item.type}</Text>
        </View>
      </View>



    </Pressable >
  )


}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: Sizing.layout.x90,
  },
  nameView: {
    alignContent: 'center',
    flex: 0.3,
    padding: Sizing.x5
  },
  cardInnerView: {
    minWidth: Sizing.screen.width / 3.5,
    backgroundColor: Colors.card.background,
  },
  cardView: {
    flex: 1,
    marginHorizontal: Sizing.x10,
    marginVertical: Sizing.x10,
    backgroundColor: Colors.neutral.white,
    ...Outlines.shadow.base
  },
  nameText: {


  }

});
export default memo(LocationListGrid);
