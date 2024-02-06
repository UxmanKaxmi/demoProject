import { View, Text, TouchableHighlight, StyleSheet, Image, ListRenderItemInfo, Pressable } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react';
import { Result } from '../types/character-types';
import { Colors, Outlines, Sizing, Typography } from '@styles/index';
import { useNavigation } from '@react-navigation/native';


  const CharacterListSingle = ({ item, index, separators }: ListRenderItemInfo<Result>) => {

  const MoreVal =  useMemo(()=>  "more...",[]) 
  
  const navigation = useNavigation()

 // Function to break the episodes to render in UI
 const renderEpisodes = useCallback((episodes: any[]) => {

    let splitEpisodes = episodes.map((val) => {
      return val.split('episode/')[1]
    })

    if (splitEpisodes.length < 2) {
      return (
        <View key={index} style={{}}>
          <View style={styles.episodesView}>
            <Text style={[Typography.body.x10, { textAlign: 'center' }]}>{splitEpisodes[0]}
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
              <View key={index} style={[styles.episodesOuterView, {
                backgroundColor: val == MoreVal ? "transparent" : Colors.Episodes.brand,
              }]}>
                <Text style={[Typography.fontSize.x1 , { textAlign: "center", }]}>
                  {val}
                </Text>
              </View>
            )
          })}
        </View>
      )
    }

  },[]
 )


  return (
  <Pressable
    onPress={() => navigation.navigate("DetailCharacter",item)}
    style={({ pressed }) => [
      { opacity: pressed ? 0.8 : 1 },
      styles.cardView
    ]}
    key={index}

  >
    <View style={styles.mainInnerView}>
      <View style={styles.imageView}>
        <Image style={styles.image}
          source={{ uri: item.image }}
        />
      </View>


      <View style={styles.cardViewOuter}>

        <View style={{ flex: 1 }}>
          <View style={styles.cardViewTop}>
            <View style={styles.cardViewInner}>
              <View style={{ flex: 1 }}>
                <Text style={[Typography.header.x30]}>{item.name}</Text>
                <Text style={{}}>{item.species}</Text>
              </View>
            </View>


            <View style={styles.cardViewInner}>
              <View style={{}}>
                <Text style={[Typography.subheader.x10]}>Origin</Text>


                <View style={styles.originView}>
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
            <View style={styles.cardViewInner}>
              <View style={{ flex: 1 }}>
                <Text style={[Typography.subheader.x10]}>Episodes</Text>
                {renderEpisodes(item.episode)}

              </View>
            </View>
          </View>
        </View>

      </View>
    </View >


  </Pressable >
  );
};

export default memo(CharacterListSingle);

const styles = StyleSheet.create({
  originView: {
    paddingHorizontal: Sizing.x10,
    paddingVertical: Sizing.x1,
    backgroundColor: Colors.Location.brand,
    borderRadius: Outlines.borderRadius.large,
  },
  cardViewInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  cardViewTop: {
    flex: 0.7,
    justifyContent: 'space-between',
  },
  cardViewOuter: {
    flex: 0.6,
    flexDirection: 'row',
    marginLeft: Sizing.x15,
    marginVertical: Sizing.x10,
  },
  image: {
    height: Sizing.layout.x120,
    width: "100%",
    resizeMode: "cover",
  },
  imageView: {
    backgroundColor: Colors.card.background,
    flex: 0.4,
  },
  mainInnerView: {
    backgroundColor: Colors.card.background,
    flexDirection: "row",
  },
  episodesOuterView: {
    paddingVertical: Sizing.x2,
    borderRadius: 15,
    marginRight: Sizing.x7,
    minWidth: Sizing.x40,
    justifyContent: 'flex-end',
  },
  episodesView: {
    paddingVertical: Sizing.x1,
    backgroundColor: Colors.Episodes.brand,
    borderRadius: 15,
    width: Sizing.x40,
  },
  cardView: {
    flex: 1,
    marginHorizontal: Sizing.x10,
    marginVertical: Sizing.x10,
    backgroundColor: Colors.card.background,
    ...Outlines.shadow.base
  },
});

