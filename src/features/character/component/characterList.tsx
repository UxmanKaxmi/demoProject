import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { useGetAllCharactersQuery } from '@features/character'
// import { useGetPokemonQuery } from '@config/pokemon'


export const CharacterList = () => {
  const { data, error, isLoading } = useGetAllCharactersQuery()
  return (
    <View>
      {
        isLoading ? <Text>is Loading</Text> :
          error ? <Text>ERROR</Text> :
            <View>
              <FlatList data={data?.results} renderItem={({ item, index }) => <Text>{item.name}</Text>} />
            </View>
      }

    </View>
  )
}