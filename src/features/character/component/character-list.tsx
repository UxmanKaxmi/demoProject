import { View, Text, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useGetAllCharactersQuery } from '@features/character/api/get-all-characters'
import reactotron from 'reactotron-react-native'
import Loading from "@components/loading"
import { CharacterListSingle } from './character-list-single'
// import { useGetPokemonQuery } from '@config/pokemon'
import { Result } from '../types/character-types';
import { Colors, Sizing } from '@styles/index'
import { CharacterListGrid } from './character-list-grid'
import { useAppSelector } from '@hooks/index'
import { RootState } from '@store/store'


export const CharacterList = () => {
  const [pageCount, setPageCount] = useState(1)
  
  const isGrid = useAppSelector((state: RootState) => state.isGrid.value)
  const { data, error, isLoading, isFetching } = useGetAllCharactersQuery(pageCount)


  return (
    <View>
      {
        isLoading ? <Loading /> :
          error ? <Text>ERROR</Text> :
            <View>
              {isGrid ?
                <FlatList<Result> data={data?.results}
                  key={'isGrid'} // key is added, to rerender the flatlist on view change
                  keyExtractor={item => "isGrid" + item.id}
                  numColumns={3}
                  ListHeaderComponent={() => <View style={{ marginTop: Sizing.x10 }} />}
                  contentContainerStyle={{
                    justifyContent: 'center',
                  }}

                  renderItem={({ item, index, separators }) => CharacterListGrid({ item, index, separators })
                  }
                  onEndReached={() => setPageCount(pageCount + 1)}
                  ListFooterComponent={() => isFetching ? <Loading /> : null}
                // onStartReached={() => setPage(page - 1)}
                />

                :
                <FlatList<Result> data={data?.results}
                  key={'isList'}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={() => <View style={{ marginTop: Sizing.x10 }} />}
                  style={{
                    backgroundColor: Colors.neutral.s100,

                  }}
                  renderItem={({ item, index, separators }) => CharacterListSingle({ item, index, separators })
                  }
                  onEndReached={() => setPageCount(pageCount + 1)}
                  ListFooterComponent={() => isFetching ? <Loading /> : null}
                />
              }
            </View>
      }

    </View>
  )
}