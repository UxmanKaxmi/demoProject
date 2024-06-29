import { View, Text, TouchableHighlight, StyleSheet, Image, ListRenderItemInfo, Pressable } from 'react-native'
import React, { memo } from 'react';
import { Result } from '../types/character-types';
import { Colors, Outlines, Sizing, Typography } from '@styles/index';
import { useNavigation } from '@react-navigation/native';



const CharacterListGrid= ({ item, index, separators }: ListRenderItemInfo<Result>) => {
  const navigation = useNavigation()

  return (
    <Pressable
    onPress={() => navigation.navigate("DetailCharacter",item)}
      style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 },
        styles.cardView
      ]}
      key={index}

    >
      <View style={styles.cardInnerView}>

        <View style={{ flex: 0.7 }}>
          <Image style={styles.image}
            source={{ uri: item.image }}
          />
        </View>

        <View style={styles.nameView}>
          <Text numberOfLines={1} style={[Typography.header.x20]}>{item.name}</Text>
          <Text >{item.species}</Text>
        </View>


      </View >


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
});
export default memo(CharacterListGrid);
