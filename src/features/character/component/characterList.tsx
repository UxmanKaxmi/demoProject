import { View, Text, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useGetAllCharactersQuery } from '@features/character'
import reactotron from 'reactotron-react-native'
import Loading from "@components/loading"
// import { useGetPokemonQuery } from '@config/pokemon'


export const CharacterList = () => {
  const [pageCount, setPageCount] = useState(1)

  const { data, error, isLoading, isFetching } = useGetAllCharactersQuery(pageCount)

  return (

    <View>
      {
        isLoading ? <Loading /> :
          error ? <Text>ERROR</Text> :
            <View>

              <FlatList data={data?.results} renderItem={({ item, index }) => <Text style={{ fontSize: 20, padding: 20 }}>{item.name} {item.id}</Text>}
                onEndReached={() => setPageCount(pageCount + 1)}
                ListFooterComponent={()=>isFetching?<Loading/>:null}
              // onStartReached={() => setPage(page - 1)}
              />
            </View>
      }

    </View>
  )
}