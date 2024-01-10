import { View, Text, FlatList, StyleSheet, FlatListProps, TouchableOpacity, ListRenderItemInfo } from 'react-native'
import React, { useEffect, useState, SetStateAction, useRef, useMemo } from 'react'

import { useGetAllCharactersQuery, useGetCharacterByGenderQuery, useLazyGetCharacterByNameQuery,useGetCharacterByNameQuery, useGetCharacterBySpeciesQuery } from 'features/character/api/character-api'
import Loading from "@components/loading"
// import  CharacterListSingle  from './character-list-single'
// import { useGetPokemonQuery } from '@config/pokemon'
import { Result } from '../types/character-types';
import { Colors, Sizing } from '@styles/index'
import CharacterListGrid from './character-list-grid'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { RootState } from '@store/store'
import { setSearchTextInRedux } from '../actions/search-text-slice'
import { setPageCountInRedux } from '../actions/page-count-slice'
import { defaultSplitApi } from 'service'
import CharacterListSingle from './character-list-single';
import Error from 'components/error';
import { FLATLIST_VIEW } from '../constants';
// import { useFilterByNameQuery } from '../api/filter-characters'



export const CharacterList = () => {

  /** CONSTANTS */
  const [resultsAfterFilter, setResultsAfterFilter] = useState<Result | any>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [skipAllDataQuery, setSkipAllDataQuery] = useState<boolean>(false)
  const [skipByNameQuery, setSkpByNameQuery] = useState<boolean>(true)


  const flatListRef = useRef<FlatList>(null);


  /* SELECTORS */
  const isGrid = useAppSelector((state: RootState) => state.isGrid.value)
  const searchTextFromRedux = useAppSelector((state: RootState) => state.search.value)
  const pageCount = useAppSelector((state: RootState) => state.pageCount.pageCount)

  const FilteredValue = useAppSelector((state: RootState) => state.selectedFilter.value)
  const GenderValue = useAppSelector((state: RootState) => state.gender.value)

  const dispatch = useAppDispatch()


  /* QUERIES */
  const {
    data: CharacterAllData,
    error: CharacterAllDataError,
    isLoading: CharacterAllIsLoading,
    isFetching: CharacterAllIsFetching
  } = useGetAllCharactersQuery({ page: pageCount, name: "" },
    { skip: FilteredValue == "Name" && searchTextFromRedux !== "" && GenderValue == ""  || FilteredValue == "Species"})



  const {
    data: CharacterByNameData,
    error: CharacterByNameError,
    isLoading: CharacterByNameIsLoading,
    isFetching: CharacterByNameIsFetching
  } = useGetCharacterByNameQuery({ page: pageCount, name: searchTextFromRedux },
    { skip: FilteredValue == "Name" && searchTextFromRedux == "" && GenderValue == "" || FilteredValue == "Species"})

  
  // const [getCharacterByName,{
  //   data: CharacterByNameData,
  //   error: CharacterByNameError,
  //   isLoading: CharacterByNameIsLoading,
  //   isFetching: CharacterByNameIsFetching
  // }] = useLazyGetCharacterByNameQuery()


  const {
    data: CharacterByGenderData,
    error: CharacterByGenderError,
    isLoading: CharacterByGenderIsLoading,
    isFetching: CharacterByGenderIsFetching
  } = useGetCharacterByGenderQuery({ page: pageCount, name: "", gender: GenderValue },
    { skip: FilteredValue !== "Gender"  })



  const {
    data: CharacterBySpeciesData,
    error: CharacterBySpeciesError,
    isLoading: CharacterBySpeciesIsLoading,
    isFetching: CharacterBySpeciesIsFetching
  } = useGetCharacterBySpeciesQuery({ page: pageCount, species: searchTextFromRedux },
    { skip: FilteredValue !== "Species" && searchTextFromRedux == "" })



  //   const onRefresh = async () => {
  //     setIsRefreshing(true)

  //     dispatch(defaultSplitApi.util.resetApiState())

  //     //set isRefreshing to true
  //     const result = await refetch()
  //     console.log(result)
  //     setIsRefreshing(false)


  //     // and set isRefreshing to false at the end of your callApiMethod()
  // }

  useEffect(() => {
    // console.log("xx FilteredValue",FilteredValue)
    // console.log("xx searchTextFromRedux",searchTextFromRedux)

     if (FilteredValue === "Name" && searchTextFromRedux  === "") {
      console.log('in name')
      setResultsAfterFilter(CharacterAllData)
     }
     else if(FilteredValue === "Name" && searchTextFromRedux  !== "" ){
       console.log('in BY name')
      //  getCharacterByName({ page: pageCount, name: searchTextFromRedux })
       setResultsAfterFilter(CharacterByNameData)
      }
     else if( FilteredValue === "Gender" ){
       setResultsAfterFilter(CharacterByGenderData)

     }
     else if( FilteredValue === "Species" && searchTextFromRedux  !== "" ){
       console.log('in Species')
       setResultsAfterFilter(CharacterBySpeciesData)

     }
     else {
      setResultsAfterFilter(CharacterAllData)
        // dispatch(defaultSplitApi.util.invalidateTags(["CharactersByName","CharactersByGender","Characters"]))
     }
  })

  // useEffect(() => {
  //   getCharacterByName({ page: pageCount, name: searchTextFromRedux })
  // },[searchTextFromRedux,pageCount])
  




  /* Condition to check if both the queries are LOADING with no ERRORS */

  /* Condition for LOADING */
  if (
    CharacterByNameIsLoading ||
    CharacterAllIsLoading ||
    CharacterByGenderIsLoading ||
    CharacterBySpeciesIsLoading

  ) {
    return (<Loading isAnimation />)
  }

  /* Condition for FETCHING, isFetching is different from isLoading, see docs*/
  // else if (
  //   CharacterByNameIsFetching ||
  //   CharacterAllIsFetching
  // ) {
  //   return (<Text>is Fetching</Text>)
  // }

  /* Condition for ERRORS */
  else if (
    CharacterAllDataError ||
    CharacterByNameError ||
    CharacterByGenderError ||
    CharacterBySpeciesError


  ) {
    return (<Error />)
  }

  /* If no loading and no Errors */
  else {
    /* To stop pagination after the total pages count is reached */
    let totalPages = resultsAfterFilter?.info?.pages
    let onEndReachedCalledDuringMomentum = false

    console.log("resultsAfterFilter",resultsAfterFilter)
    return (
      <View>
        {isGrid ?
          <FlatList<Result> data={resultsAfterFilter?.results}
            key={FLATLIST_VIEW.GRID} // key is added, to rerender the flatlist on view change

            // onRefresh={onRefresh}

            numColumns={3}
            ListHeaderComponent={() => <View style={styles.flatListView} />}
            contentContainerStyle={{
              justifyContent: 'center',
            }}
            showsVerticalScrollIndicator={false}
            style={styles.flatListMainView}
            renderItem={({ item, index, separators }) => <CharacterListGrid item={item} index={item.id} separators={separators} />}
            onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
            onEndReached={() => onEndReachedCalledDuringMomentum ? null :
              pageCount < totalPages ?
                dispatch(setPageCountInRedux(pageCount + 1))
                : null
            }
            ListFooterComponent={() => CharacterAllIsFetching ? <Loading /> : null}
            initialNumToRender={10}
            onEndReachedThreshold={0.1}
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            windowSize={15}
            getItemLayout={(data, index) => (
              { length: Sizing.layout.x90, offset: Sizing.layout.x90 * index, index }
            )}

          />
          :
          <FlatList<Result> data={resultsAfterFilter?.results}
            ref={flatListRef}
            key={FLATLIST_VIEW.LIST} // key is added, to rerender the flatlist on view change
            keyExtractor={item => item.id + item.name?.toString()}
            showsVerticalScrollIndicator={true}
            refreshing={isRefreshing}
            // onRefresh={onRefresh}

            ListHeaderComponent={() => <View style={styles.flatListView} />}
            style={styles.flatListMainView}
            // renderItem={({ item, index, separators }) => <CharacterListSingle item={item}/>  
            // }
            renderItem={({ item, index, separators }) => <CharacterListSingle item={item} index={item.id} separators={separators} />}

            onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
            onEndReached={() => onEndReachedCalledDuringMomentum ? null :
              pageCount < totalPages ?
                dispatch(setPageCountInRedux(pageCount + 1))
                : null
            }

            ListFooterComponent={() => CharacterAllIsFetching ? <Loading /> : null}
            initialNumToRender={8}
            onEndReachedThreshold={0.1}
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            windowSize={15}
            getItemLayout={(data, index) => (
              { length: Sizing.layout.x120, offset: Sizing.layout.x120 * index, index }
            )}
          />
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  flatListMainView: {
    backgroundColor: Colors.neutral.white,
  },
  flatListView: {
    marginTop: Sizing.x10,
  },
})