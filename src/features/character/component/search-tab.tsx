
import { Colors, Outlines, Sizing, Typography } from '@styles/index';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  TextInput,
} from 'react-native';

import gridIcon from "@imgs/grid-icon.png"
import listIcon from "@imgs/list-icon.png"
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { RootState } from '@store/store';
import { setIsGrid } from '@features/character/actions/is-grid-slice';
import { useNavigation } from '@react-navigation/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
// import { useLazyGetCharactersByNameQuery } from '../api/get-all-characters';
import { setSearchTextInRedux } from '../actions/search-text-slice';
import { useGetAllCharactersQuery ,useLazyGetAllCharactersQuery} from '../api/get-all-characters';
import { setPageCountInRedux } from '../actions/page-count-slice';
import { defaultSplitApi } from 'service';






//its the search bar with the view button to change it into a GRID or LIST
export const ChangeViewTab: React.FC = ({ }) => {

  //for setting the filter: By name  | By species |  By Gender
  const filterValue = useAppSelector((state: RootState) => state.selectedFilter.value) 

  const searchValueRedux = useAppSelector((state: RootState) => state.search.value)

  const [searchValue,setSearchValue] = useState('')

  // const [trigger] = useLazyGetCharactersByNameQuery()
  const navigation = useNavigation()

  const dispatch = useAppDispatch()

  const isGrid = useAppSelector((state: RootState) => state.isGrid.value)
  const [trigger] = useLazyGetAllCharactersQuery()


  const searchIcon = useMemo(() => {
    return (<Icon name="search1" size={Sizing.icons.x20} color={Colors.neutral.s400} />)
  }, []);
  const closeIcon = useMemo(() => {
    return (<Icon name="close" size={Sizing.icons.x20} color={Colors.neutral.s400} />)
  }, []);

  const onCloseSearchPress = ()=> {
    dispatch(setSearchTextInRedux(""))
    dispatch(setPageCountInRedux(1))
    setSearchValue("")

  }

  useEffect(() => {
    if(searchValue===""){
      dispatch(setSearchTextInRedux(""))
      dispatch(setPageCountInRedux(1))

    }
  })
  

  const onSubmit =  () => {
    dispatch(setSearchTextInRedux(searchValue))
    dispatch(setPageCountInRedux(1))
    dispatch(defaultSplitApi.util.resetApiState())

    
  }


  return (
    <View style={styles.mainView}>
      {/* For the search input */}
      <View style={styles.searchView}>
        <Pressable
          onPress={() => onCloseSearchPress()}
          style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 },
          ]}>
          {searchValue.length > 0 ? closeIcon : searchIcon}
        </Pressable>
        <TextInput
          style={styles.input}
          onChangeText={val=>setSearchValue(val)}
          value={searchValue}
          placeholder="Search..."
          keyboardType="default"
          returnKeyType='search'
          enablesReturnKeyAutomatically
          onSubmitEditing={onSubmit}
          autoCorrect={false}
        />
        <Pressable
          onPress={() => navigation.navigate("FilterModal")}
          style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 },
          ]}>

          <View style={styles.outerView}>
            <Text style={styles.filterText}>{filterValue == "None" ? null : "By"} {filterValue}</Text>
          </View>
        </Pressable>



      </View>



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
  outerView: {
    backgroundColor: Colors.secondary.brand,
    paddingVertical: Sizing.x7,
    paddingHorizontal: Sizing.x10,
    borderRadius: Outlines.borderRadius.base
  },
  filterText: {
    color: 'white',
    ...Typography.fontSize.x5,
    fontWeight: 'bold'
  },
  filterIcon: {
    height: Sizing.icons.x20,
    width: Sizing.icons.x20,
    opacity: 0.5,
  },
  searchView: {
    flex: 0.8,
    justifyContent: 'center',
    flexDirection: 'row',
    height: Sizing.layout.x60,
    marginLeft: Sizing.x10,
    borderColor: Colors.neutral.s400,
    borderWidth: Outlines.borderWidth.hairline,
    padding: Sizing.x10,
    borderRadius: Outlines.borderRadius.base,
    alignItems: 'center',
  },
  mainView: {
    flexDirection: 'row',
    height: Sizing.x70,
    width: "auto",
    alignItems: 'center',
    backgroundColor: Colors.neutral.white
  },
  icon: {
    height: Sizing.icons.x25,
    width: Sizing.icons.x25,
    opacity: 0.5,
  },
  changeViewButton: {
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    marginLeft: Sizing.x10
  },
});