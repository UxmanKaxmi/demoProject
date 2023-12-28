import { LocationScreen, EpisodeScreen, CharacterScreen } from '@screens/index';
import { useState } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {
  TabView,
  SceneMap,
  SceneRendererProps,
} from 'react-native-tab-view';

import { Colors, Sizing, Typography } from '@styles/index';
import { Route, State } from './navigation.types';
import rickIcon from "@imgs/rick-icon.png"
import locationIcon from "@imgs/location-icon.png"
import episodeIcon from "@imgs/episode-icon.png"
import { ChangeViewTab } from '@features/character';






const CustomTabBar = () => {


  const [index, onIndexChange] = useState(0);


  const [routes] = useState<Route[]>([
    { key: 'character', title: 'Character', icon: rickIcon },
    { key: 'location', title: 'Location', icon: locationIcon },
    { key: 'episode', title: 'Episode', icon: episodeIcon },

  ]);




  const renderItem =
    ({
      navigationState,
      position,
    }: {
      navigationState: State;
      position: Animated.AnimatedInterpolation<number>;
    }) =>
      ({ route, index }: { route: Route; index: number }) => {

        const inputRange = navigationState.routes.map((_, i) => i);

        const activeOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 1 : 0)),
        });
        const inactiveOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 0 : 1)),
        });

        return (

          <View style={styles.tab}>
            <Animated.View style={[styles.item, {
              opacity: inactiveOpacity,
              // backgroundColor: route.title == "Character" ? route.title == "Location" ? "green" : 'yellow' : "blue" 
            }]}>
              <Image style={[styles.icon, styles.inactive]} source={route.icon} />
              <Text style={[Typography.header.x20, styles.inactive, styles.label, Typography.fontWeight.regular]}>{route.title}</Text>
            </Animated.View>
            <Animated.View
              style={[styles.item, styles.activeItem, { opacity: activeOpacity }]}
            >
              <Image style={[styles.icon, styles.active]} source={route.icon} />
              <Text style={[Typography.header.x20, styles.active, styles.label]}>{route.title}</Text>
            </Animated.View>
          </View >

        );
      };

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State }
  ) => (
    <View >
      <View style={styles.taBarMainView}>
        {props.navigationState.routes.map((route: Route, index: number) => {
          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={() => props.jumpTo(route.key)}
            >

              {renderItem(props)({ route, index })}
            </TouchableWithoutFeedback>
          );
        })}
      </View>

      <ChangeViewTab />
    </View>
  );

  const renderScene = SceneMap({
    character: CharacterScreen,
    location: LocationScreen,
    episode: EpisodeScreen,
  });

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      tabBarPosition="top"
      onIndexChange={onIndexChange}
    />
  );
};


export default CustomTabBar;

const styles = StyleSheet.create({
  taBarMainView: {
    
    flexDirection: "row",
    backgroundColor:Colors.neutral.white,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizing.x10
  },
  activeItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  active: {
    opacity: 1
  },
  inactive: {
    // color: '#939393',
    opacity: 0.3
  },
  icon: {
    margin: Sizing.x10,
    height: Sizing.x50,
    width: Sizing.x50,
  },
  label: {
    backgroundColor: 'transparent',
  },
});