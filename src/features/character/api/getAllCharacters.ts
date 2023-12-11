import { defaultSplitApi } from "@service/index"
import type { Character, Result } from '../types'



//example
// getPokemonByName: builder.query<Pokedex, object>({
//     query: (body: object) => ({
//         url: "/anything",
//         method: 'POST',
//         body: {
//             body: body
//         },
//     }),

// })

export const characterApi = defaultSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCharacters: builder.query<Character, void>({
            query: () => `character`,
            providesTags: (result, error, arg) =>
            result
              ? [...result.results.map(({ id }) => ({ type: 'character' as const, id })), 'character']
              : ['character'],
    

        }),

    }),

    overrideExisting: true,

})


// Export hooks for usage in functional components
export const { useGetAllCharactersQuery } = characterApi
// .enhanceEndpoints({
//     endpoints: {
//         getAllCharacters: {
//             transformResponse: (rawResult: { (results: Result): Character }) => {
//                 //                                                        ^
//                 // The optional `meta` property is available based on the type for the `baseQuery` used

//                 // The return value for `transformResponse` must match `ResultType`
//                 return rawResult
//             },
//         }
//     }
// });