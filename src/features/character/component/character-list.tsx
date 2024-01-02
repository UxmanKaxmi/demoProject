import { View, Text, FlatList, StyleSheet, FlatListProps,TouchableOpacity, ListRenderItemInfo } from 'react-native'
import React, { useEffect, useState, SetStateAction, useRef, useMemo } from 'react'

import { useGetAllCharactersQuery, useGetCharacterByNameQuery } from 'features/character/api/get-character'
import Loading from "@components/loading"
// import  CharacterListSingle  from './character-list-single'
// import { useGetPokemonQuery } from '@config/pokemon'
import { Result } from '../types/character-types';
import { Colors, Sizing } from '@styles/index'
import  CharacterListGrid  from './character-list-grid'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { RootState } from '@store/store'
import { setSearchTextInRedux } from '../actions/search-text-slice'
import { setPageCountInRedux } from '../actions/page-count-slice'
import { defaultSplitApi } from 'service'
import CharacterListSingle from './character-list-single';
// import { useFilterByNameQuery } from '../api/filter-characters'



export const CharacterList = () => {

  /** CONSTANTS */
  const [resultsAfterFilter, setResultsAfterFilter] = useState<Result | any>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const flatListRef = useRef<FlatList>(null);


  /* SELECTORS */
  const isGrid = useAppSelector((state: RootState) => state.isGrid.value)
  const searchTextFromRedux = useAppSelector((state: RootState) => state.search.value)
  const pageCount = useAppSelector((state: RootState) => state.pageCount.pageCount)

  const FilteredValue = useAppSelector((state: RootState) => state.selectedFilter.value)
  const dispatch = useAppDispatch()


  /* QUERIES */
  const {
    refetch,
    data: CharacterAllData,
    error: CharacterAllDataError,
    isLoading: CharacterAllIsLoading,
    isFetching:CharacterAllIsFetching
   } = useGetAllCharactersQuery({ page: pageCount, name: "" }, { skip: searchTextFromRedux !== ""  })

   


  const {
    data: CharacterByNameData,
    error: CharacterByNameError,
    isLoading: CharacterByNameIsLoading,
    isFetching:CharacterByNameIsFetching
  } = useGetCharacterByNameQuery({ page: pageCount, name: searchTextFromRedux }, { skip: searchTextFromRedux === "" })



  
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
    if (searchTextFromRedux != "") {
      dispatch(defaultSplitApi.util.invalidateTags(["Characters"]))

      // flatListRef.current?.scrollToOffset({animated: true, offset: 0}) 
      setResultsAfterFilter(CharacterByNameData)

    }
    else {
      dispatch(defaultSplitApi.util.invalidateTags(["CharactersByName"]))
      // flatListRef.current?.scrollToOffset({animated: true, offset: 0}) 
      setResultsAfterFilter(CharacterAllData)


    }
  })




  /* Condition to check if both the queries are LOADING with no ERRORS */

  /* Condition for LOADING */
  if (
    !CharacterByNameIsLoading ||
    CharacterAllIsLoading
  ) {
    return (<Loading isAnim  />)
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
    CharacterByNameError
  ) {
    return (<Text>Error</Text>)
  }

  /* If no loading and no Errors */
  else {

    /* To stop pagination after the total pages count is reached */
    let totalPages = resultsAfterFilter?.info?.pages
    let onEndReachedCalledDuringMomentum =false

    return (
      <View>
        {isGrid ?
          <FlatList<Result> data={resultsAfterFilter?.results}
            key={'isGrid'} // key is added, to rerender the flatlist on view change
           
            // onRefresh={onRefresh}

            numColumns={3}
            ListHeaderComponent={() => <View style={styles.flatListView} />}
            contentContainerStyle={{
              justifyContent: 'center',
            }}
            showsVerticalScrollIndicator={false}
            style={styles.flatListMainView}
            renderItem={({ item,index,separators}) => <CharacterListGrid item={item} index={index} separators={separators}/>}
            onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum = false;}}
            onEndReached={() => onEndReachedCalledDuringMomentum ? null:
              pageCount < totalPages ?
              dispatch(setPageCountInRedux(pageCount + 1))
              : null
            }
            ListFooterComponent={() => CharacterAllIsFetching ? <Loading />:null }
            initialNumToRender={10}
            onEndReachedThreshold={0.1} 
            

            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            windowSize={15}
            getItemLayout={(data, index) => (
              {length: Sizing.layout.x90, offset: Sizing.layout.x90 * index, index}
            )}

          />
          :
          <FlatList<Result> data={resultsAfterFilter?.results}
            ref={flatListRef}
            key={'isList'} // key is added, to rerender the flatlist on view change
            keyExtractor={item => item.id + item.name?.toString()}
            showsVerticalScrollIndicator={false}
            refreshing={isRefreshing}
            // onRefresh={onRefresh}

            ListHeaderComponent={() => <View style={styles.flatListView} />}
            style={styles.flatListMainView}
            // renderItem={({ item, index, separators }) => <CharacterListSingle item={item}/>  
            // }
            renderItem={({ item,index,separators}) => <CharacterListSingle item={item} index={index} separators={separators}/>}

            onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum = false;}}
            onEndReached={() => onEndReachedCalledDuringMomentum ? null:
              pageCount < totalPages ?
              dispatch(setPageCountInRedux(pageCount + 1))
              : null
            }
            ListFooterComponent={() => CharacterAllIsFetching ? <Loading />:null }
            initialNumToRender={8}
            onEndReachedThreshold={0.1} 

            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            windowSize={15}
            getItemLayout={(data, index) => (
              {length: Sizing.layout.x120, offset: Sizing.layout.x120 * index, index}
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