import { defaultSplitApi } from "@service/index"
import type { Character, ListResponse, Result } from '../types/character-types'
import { createSelector, current } from "@reduxjs/toolkit";



export const GetCharacterApi = defaultSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCharacters: builder.query<ListResponse<Result>, { page: number; name: string }>({
            query: (arg) => {
                console.log('default API', arg)
                const { page } = arg;
                return `character/?page=${page}`
            },

            // Only have one cache entry because the arg always maps to one string
            serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
                return endpointName
            },

            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                if(currentCache !== newItems){
                    currentCache.results.push(...newItems.results)
                }
            },


            // // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },

            providesTags: ["Characters"]
            // (result, error, page) => result
            //     ? [
            //         // Provides a tag for each post in the current page,
            //         // as well as the 'PARTIAL-LIST' tag.
            //         ...result.results.map(({ id }) => ({ type: 'CharactersByName' as const, id })),
            //         { type: 'CharactersByName', id: 'CharactersByName-LIST' },
            //     ]
            //     : [{ type: 'CharactersByName', id: 'CharactersByName-LIST' }],


            // Invalidates the tag for this Post `id`, as well as the `PARTIAL-LIST` tag,
            // causing the `listPosts` query to re-fetch if a component is subscribed to the query.
            // invalidatesTags: (result, error, id) => [
            //     { type: 'Characters', id },
            //     { type: 'Characters', id: 'PARTIAL-LIST' },
            // ],
        }),
        getCharacterByName: builder.query<ListResponse<Result>, { page: number; name: string }>({
            query: (arg) => {
                console.log('By name API', arg)
                const { page, name } = arg;
                return `character/?page=${page}&name=${name}`
            },


            // // Only have one cache entry because the arg always maps to one string
            // serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
            //     return endpointName 
            //   },

            // Always merge incoming data to the cache entry
            serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
                return endpointName
            },

            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                   if(currentCache.results !== newItems.results){
                    currentCache.results.push(...newItems.results)
                }
            },


            // // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },


            providesTags: ["CharactersByName"]
            // Invalidates the tag for this Post `id`, as well as the `PARTIAL-LIST` tag,
            // causing the `listPosts` query to re-fetch if a component is subscribed to the query.

        }),
    }),
    overrideExisting: true,

})



// Export hooks for usage in functional components
export const { useGetAllCharactersQuery, useLazyGetAllCharactersQuery, useGetCharacterByNameQuery
} = GetCharacterApi
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