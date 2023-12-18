import { View, Text, TouchableHighlight, StyleSheet, Image, ListRenderItemInfo } from 'react-native'
import React, { useMemo, useCallback } from 'react';
import { ListRenderItem } from 'react-native'
import { Result } from '../types/character-types';
import { Colors, Sizing, Typography } from '@styles/index';



export const CharacterListGrid = ({ item, index, separators }: ListRenderItemInfo<Result>) => {


  return (
    <TouchableHighlight
      onPress={() => {
        {}
      }}
      style={{
        flex: 1,
        marginHorizontal: Sizing.x10,
        marginVertical: Sizing.x10,
        backgroundColor: 'white',
        shadowColor: "#FBFBFB",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: Sizing.x120,
        height: Sizing.x120,
      }}
      // underlayColor={"red"}
      key={index}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
    >
      <View style={{
        backgroundColor: '#FBFBFB',
        flex: 1,

      }}>
        
        <View style={{ flex: 0.7 }}>
          <Image style={{
            resizeMode: "cover", height: Sizing.layout.x90,
          }}
            source={{ uri: item.image }}
          />
        </View>

        <View style={{ alignContent: 'center', flex: 0.3, marginTop: Sizing.x15 }}>
          <Text style={[{ fontWeight: "bold" }, Typography.fontSize.x10]}>{item.name}</Text>
          <Text style={{}}>{item.species}</Text>
        </View>


      </View >


    </TouchableHighlight >
  )


}

const styles = StyleSheet.create({

});