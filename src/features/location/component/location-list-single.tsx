import { View, Text, TouchableHighlight, StyleSheet, Image, ListRenderItemInfo, Pressable } from 'react-native'
import React, { memo, useCallback, useMemo } from 'react';
import { Colors, Outlines, Sizing, Typography } from '@styles/index';
import { useNavigation } from '@react-navigation/native';
import { Result } from '../types/location-types';


const LocationListSingle = ({ item, index, separators }: ListRenderItemInfo<Result>) => {

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
      <View style={styles.mainInnerView}>
        <View style={{ flex: 1 }}>
          <Text style={[Typography.header.x50]}>{item?.name}</Text>
          <Text style={{}}>{item.type}</Text>
        </View>

        <View style={styles.cardViewInner}>
          <View style={{ flex: 1 }}>
            <Text style={[Typography.subheader.x10]}>Origin</Text>
            <View style={styles.originView}>
              <Text style={[Typography.body.x10]}>{item.dimension}
              </Text>
            </View>

            {/* {renderEpisodes(item.episode)} */}

          </View>
        </View>
      </View>



    </Pressable >
  );
};

export default memo(LocationListSingle);

const styles = StyleSheet.create({
  originView: {
    alignSelf: 'flex-start',
    paddingHorizontal: Sizing.x10,
    paddingVertical: Sizing.x1,
    backgroundColor: Colors.Location.brand,
    borderRadius: Outlines.borderRadius.large,
  },
  cardViewInner: {
    marginTop: Sizing.x30,
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
    paddingVertical: Sizing.x10,
    paddingHorizontal: Sizing.x20,
    backgroundColor: Colors.card.background,
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

