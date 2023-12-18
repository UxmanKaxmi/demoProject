import { View, Text, TouchableHighlight, StyleSheet, Image, ListRenderItemInfo } from 'react-native'
import React, { useMemo, useCallback } from 'react';
import { ListRenderItem } from 'react-native'
import { Result } from '../types/character-types';
import { Colors, Sizing, Typography } from '@styles/index';



export const CharacterListSingle = ({ item, index, separators }: ListRenderItemInfo<Result>) => {
  const MoreVal = "more..."

  //Function to break the episodes to render in UI
  const renderEpisodes = (episodes: any[]) => {
    let splitEpisodes = episodes.map((val) => {
      return val.split('episode/')[1]
    })


    if (splitEpisodes.length < 2) {
      return (
        <View key={index} style={{}}>
          <View style={{ paddingVertical: Sizing.x1, backgroundColor: Colors.Episodes.brand, borderRadius: 15, width: Sizing.x40 }}>
            <Text style={[Typography.body.x10, { textAlign: "center" }]}>{splitEpisodes[0]}
            </Text>
          </View>
        </View >

      )
    }
    else {
      const showOnlyFour = []
      for (let i = 0; i < splitEpisodes.length; i++) {
        if (i < 4) {
          showOnlyFour.push(splitEpisodes[i])
        }
        else {
          showOnlyFour.push(MoreVal)
          break
        }
      }

      return (
        <View style={{ flexDirection: 'row' }}>

          {showOnlyFour?.map((val, index) => {
            return (
              <View key={index} style={{
                paddingVertical: Sizing.x1,
                backgroundColor: val == MoreVal ? "transparent" : Colors.Episodes.brand,
                borderRadius: 15,
                marginRight: Sizing.x10,
                minWidth: Sizing.x40,
                justifyContent: 'flex-end'

              }}>
                <Text style={[val != MoreVal ? Typography.body.x10 : Typography.fontSize.x10, { textAlign: "center", }]}>
                  {val}
                </Text>
              </View>
            )
          })}
        </View>
      )
    }

  }

  return (
    <TouchableHighlight
      onPress={() => {
        { }
      }}
      style={{
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

      }}
      // underlayColor={"red"}
      key={index}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}
    >
      <View style={{

        backgroundColor: 'white',
        flexDirection: "row",
        // height: Sizing.layout.x110,
        // width: Sizing.screen.width,
        // marginVertical: Sizing.x10
      }}>

        <View style={{ backgroundColor: '#FBFBFB', flex: 0.4 }}>
          <Image style={{ height: Sizing.layout.x120, width: "100%", resizeMode: "cover" }}
            source={{ uri: item.image }}
          />
        </View>


        <View style={{ flex: 0.6, flexDirection: 'row', marginLeft: Sizing.x20, marginVertical: Sizing.x10 }}>

          <View style={{ flex: 1, }}>

            <View style={{ flex: 0.7, justifyContent: 'space-between', }}>

              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <Text style={[{ fontWeight: "bold" }, Typography.fontSize.x30]}>{item.name}</Text>
                  <Text style={{}}>{item.species}</Text>
                </View>


              </View>


              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <View style={{}}>
                  <Text style={[Typography.subheader.x10]}>Origin</Text>


                  <View style={{ paddingHorizontal: Sizing.x10, paddingVertical: Sizing.x1, backgroundColor: Colors.Location.brand, borderRadius: 20, }}>
                    <Text style={[Typography.body.x10]}>{item.origin.name}</Text>
                  </View>
                </View>

                {/* <View style={{ flex: 0.25 }}>
                      <Text style={[Typography.subheader.x10]}>Gender</Text>
                      <Text style={[Typography.body.x10]}>{item.gender}</Text>
                    </View> */}

              </View>

            </View>



            <View style={{ flex: 0.4, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <Text style={[Typography.subheader.x10]}>Episodes</Text>
                  {renderEpisodes(item.episode)}

                </View>
              </View>
            </View>


          </View>

        </View>
      </View >


    </TouchableHighlight >)


}

const styles = StyleSheet.create({

});