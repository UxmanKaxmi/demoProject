
import { Sizing } from '@styles/index';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from 'react-native';

import gridIcon from "@imgs/grid-icon.png"
import listIcon from "@imgs/list-icon.png"
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { RootState } from '@store/store';
import { setIsGrid } from '@features/character/actions/is-grid-slice';
import { useNavigation } from '@react-navigation/core';


// interface ChildProps {
// }
//its the search bar with the view button to change it into a GRID or LIST
export const ChangeViewTab: React.FC = ({ }) => {

  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const isGrid = useAppSelector((state: RootState) => state.isGrid.value)


  return (
    <View style={{ flexDirection: 'row', height: Sizing.x70, width: "auto" }}>
      {/* For the search input */}
      <View style={{ flex: 0.8, }}>
      </View>

      <Pressable style={styles.changeViewButton}
        onPress={() => navigation.navigate("FilterModal")}>
        <Text>
          Filter
        </Text>


      </Pressable>

      {/* For the buttons for changeView and Filter */}
      <View style={{ flex: 0.2, }}>

        <Pressable style={styles.changeViewButton}
          onPress={() => dispatch(setIsGrid())
          }>
          <Image style={styles.icon} source={isGrid ? gridIcon : listIcon} />
        </Pressable>


      </View>

    </View >
  );
}



const styles = StyleSheet.create({
  icon: {
    height: Sizing.icons.x25,
    width: Sizing.icons.x25,
    opacity: 0.5,
  },
  changeViewButton: {
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

});