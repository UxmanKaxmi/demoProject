
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
import gender from "@imgs/gender-icon.png"

import listIcon from "@imgs/list-icon.png"
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { RootState } from '@store/store';
import { setIsGrid } from '@features/character/actions/is-grid-slice';
import { useNavigation } from '@react-navigation/core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
// import { useLazyGetCharactersByNameQuery } from '../api/get-all-characters';
import { setSearchTextInRedux } from '../../features/character/actions/search-text-slice';
import { useGetAllCharactersQuery, useLazyGetAllCharactersQuery } from '../../features/character/api/character-api';
import { setPageCountInRedux } from '../../features/character/actions/page-count-slice';
import { defaultSplitApi } from 'service';
import { Dropdown } from 'react-native-element-dropdown';
import { fontSize } from 'styles/typography';
import { setGender } from '../../features/character/actions/gender-slice';


const dropDownData = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' },
  { label: 'Genderless', value: '3' },
  { label: 'Unknown', value: '4' },

];



//its the search bar with the view button to change it into a GRID or LIST
export const SearchTab: React.FC = ({ }) => {

  /*Constants*/
  const [dropDownValue, setDropDownValue] = useState<string>("");
  const [isDropDownFocused, setIsDropDownFocus] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('')
  // const [gender, SetGender] = useState<Gender | null>(Gender.MALE); 

  const dropDownRef: any = useRef(null);


  //for setting the filter: By Name  | By Species |  By Gender
  const filterValue = useAppSelector((state: RootState) => state.selectedFilter.value)
  const searchValueRedux = useAppSelector((state: RootState) => state.search.value)
  const isGrid = useAppSelector((state: RootState) => state.isGrid.value)
  const genderValueInRedux = useAppSelector((state: RootState) => state.gender.value)

  // const [trigger] = useLazyGetCharactersByNameQuery()
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  // const [trigger] = useLazyGetAllCharactersQuery()



  const searchIcon = useMemo(() => {
    return (<Icon name="search1" size={Sizing.icons.x20} color={Colors.neutral.s400} />)
  }, []);

  const downIcon = useMemo(() => {
    return (<Icon name="down" size={Sizing.x10} color={Colors.neutral.white} />)
  }, []);

 
  
  const closeIcon = useMemo(() => {
    return (<Icon name="close" size={Sizing.icons.x20} color={Colors.neutral.s400} />)
  }, []);

  const genderIcon = useMemo(() => {
    return (<Image source={gender} style={{ width: Sizing.icons.x20, height: Sizing.icons.x20, resizeMode: "contain", opacity: 0.6 }} />)
  }, []);




  const onCloseSearchPress = () => {
    dispatch(defaultSplitApi.util.resetApiState())
    dispatch(setSearchTextInRedux(""))
    dispatch(setPageCountInRedux(1))
    setSearchValue("")


  }

  useEffect(() => {

    if (searchValue === "") {
      dispatch(defaultSplitApi.util.resetApiState())
      dispatch(setSearchTextInRedux(""))
      dispatch(setPageCountInRedux(1))
    }
  })


  const onSubmit = () => {
    dispatch(defaultSplitApi.util.resetApiState())
    dispatch(setSearchTextInRedux(searchValue))
    dispatch(setPageCountInRedux(1))

  }

  const renderGender = () => {
    return (
      <View style={styles.searchViewInner}>
        {/* {renderLabel()} */}
        <Dropdown
          ref={dropDownRef} 
          style={[styles.dropdown, isDropDownFocused && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.input}
          itemContainerStyle={styles.input}
          iconStyle={styles.iconStyle}
          data={dropDownData}
          maxHeight={300}
          
          labelField="label"
          valueField="value"
          renderRightIcon={() => (
            null
          )}
          
          
          placeholder={!isDropDownFocused ? 'Select Gender' : '...'}
          searchPlaceholder="Search..."
          value={dropDownValue}
          onFocus={() => { }}
          onBlur={() => setIsDropDownFocus(false)
          }
          onChange={item => {
            dispatch(defaultSplitApi.util.resetApiState())
            setDropDownValue(item.value);
            dispatch(setGender(item.label))
            setIsDropDownFocus(false);

          }}
          renderLeftIcon={() => (
            
            genderIcon
          )}
        />
      </View>
    )
  }
  // const openDrowDown = ()=> {
  //   dropDownRef.current.open()
  // }

  const renderSearchByName = () => {
    return (
      <View style={styles.searchViewInner}>
        <Pressable
          onPress={() => onCloseSearchPress()}
          style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 },
          ]}>
          {searchValue.length > 0 ? closeIcon : searchIcon}
        </Pressable>
        <TextInput
          style={styles.input}
          onChangeText={val => setSearchValue(val)}
          value={searchValue}
          placeholder="Search..."
          keyboardType="default"
          returnKeyType='search'
          enablesReturnKeyAutomatically
          onSubmitEditing={onSubmit}
          autoCorrect={false}
        />
      </View>
    )
  }

  return (
    <View style={styles.mainView}>
      {/* For the search input */}
      <View style={styles.searchView}>

        {filterValue == "Gender" ?
          renderGender()
          :
          renderSearchByName()
        }

        {/* {
          filterValue === "Gender" ?
            <Pressable
            onPress={() => openDrowDown()}
            style={({ pressed }) => [
                { opacity: pressed ? 0.8 : 1, },
              ]}>
              <View style={styles.outerViewGender}>
                <Text style={styles.filterText}>{genderValueInRedux[0]}</Text>
                {downIcon}
              </View>

             
            </Pressable>
            : null
        } */}
        <Pressable
          onPress={() => navigation.navigate("FilterModal")}

          style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1, },
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
    width: Sizing.x80,
    backgroundColor: Colors.secondary.brand,
    paddingVertical: Sizing.x7,
    paddingHorizontal: Sizing.x10,
    borderRadius: Outlines.borderRadius.base
  },
  outerViewGender: {
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:'row',
    marginHorizontal:Sizing.x10,
    backgroundColor: Colors.primary.brand,
    paddingVertical: Sizing.x7,
    paddingHorizontal: Sizing.x10,
    borderRadius: Outlines.borderRadius.base
  },
  filterText: {
    color: 'white',
    textAlign: 'center',
    ...Typography.fontSize.x5,
    fontWeight: 'bold'
  },

  searchView: {
    flex: 1,
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
  searchViewInner: {
    flex: 1,
    flexDirection: 'row'


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
    marginLeft: Sizing.x10,
    ...fontSize.x30,
    color: Colors.neutral.s600
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    // height: 50,
    flex: 1,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 8,
    paddingRight: 8,
  },

  placeholderStyle: {
    ...fontSize.x30,
    flex: 1,
    marginLeft: Sizing.x10,
    color: Colors.neutral.s250,
  },
  iconStyle: {

    width: Sizing.icons.x20,
    height: Sizing.icons.x20,
  },

});