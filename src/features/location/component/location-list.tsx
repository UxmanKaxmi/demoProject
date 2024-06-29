import { View, Text, FlatList, StyleSheet, FlatListProps, TouchableOpacity, ListRenderItemInfo } from 'react-native'
import React, { useEffect, useState, SetStateAction, useRef, useMemo } from 'react'
import Loading from "@components/loading"
import { Colors, Sizing } from '@styles/index'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { RootState } from '@store/store'
import Error from 'components/error';
import { FLATLIST_VIEW } from '@features/character'
import { useGetAllLocationQuery } from '../api/location-api'
import { setPageCountInRedux } from '../actions/page-count-slice'
import LocationListSingle from './location-list-single'
import { Result } from '../types/location-types'
import LocationListGrid from './location-list-grid'


export const LocationList = () => {

  // console.log(navigation),"navigation")
  /** CONSTANTS */
  const [resultsAfterFilter, setResultsAfterFilter] = useState<Result | any>([])
  // const [isRefreshing, setIsRefreshing] = useState(false)
  // const [skipAllDataQuery, setSkipAllDataQuery] = useState<boolean>(false)
  // const [skipByNameQuery, setSkpByNameQuery] = useState<boolean>(true)
  const flatListRef = useRef<FlatList>(null);


  /* SELECTORS */
  const isGrid = useAppSelector((state: RootState) => state.isGrid.value)
  const selectedTabIndex = useAppSelector((state: RootState) => state.selectedTabIndex.selectedTab)
  // const searchTextFromRedux = useAppSelector((state: RootState) => state.search.value)
  const pageCount = useAppSelector((state: RootState) => state.pageCount.pageCount)

  // const FilteredValue = useAppSelector((state: RootState) => state.selectedFilter.value)
  // const GenderValue = useAppSelector((state: RootState) => state.gender.value)

  const dispatch = useAppDispatch()


  /* QUERIES */
  const {
    data: LocationAllData,
    error: LocationAllDataError,
    isLoading: LocationAllIsLoading,
    isFetching: LocationAllIsFetching
  } = useGetAllLocationQuery({ page: pageCount },
    { skip: selectedTabIndex != 1 })


  useEffect(() => {
    setResultsAfterFilter(LocationAllData)
  })



  /* Condition to check if both the queries are LOADING with no ERRORS */
  /* Condition for LOADING */
  if (
    LocationAllIsLoading


  ) {
    return (<Loading isAnimation />)
  }

  /* Condition for ERRORS */
  else if (
    LocationAllDataError

  ) {
    return (<Error />)
  }

  /* If no loading and no Errors */
  else {
    /* To stop pagination after the total pages count is reached */
    let totalPages = resultsAfterFilter?.info?.pages
    let onEndReachedCalledDuringMomentum = false

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
            renderItem={({ item, index, separators }) => <LocationListGrid item={item} index={item.id} separators={separators} />}
            onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
            onEndReached={() => onEndReachedCalledDuringMomentum ? null :
              pageCount < totalPages ?
                dispatch(setPageCountInRedux(pageCount + 1))
                : null
            }
            ListFooterComponent={() => LocationAllIsFetching ? <Loading /> : null}
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
            ListHeaderComponent={() => <View style={styles.flatListView} />}
            style={styles.flatListMainView}
            // renderItem={({ item, index, separators }) => <CharacterListSingle item={item}/>  
            // }
            renderItem={({ item, index, separators }) => <LocationListSingle item={item} index={item.id} separators={separators} />}

            onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
            onEndReached={() => onEndReachedCalledDuringMomentum ? null :
              pageCount < totalPages ?
                dispatch(setPageCountInRedux(pageCount + 1))
                : null
            }

            ListFooterComponent={() => LocationAllIsFetching ? <Loading /> : null}
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