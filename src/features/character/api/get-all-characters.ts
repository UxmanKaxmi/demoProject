import { defaultSplitApi } from "@service/index"
import type { Character, ListResponse, Result } from '../types/character-types'



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
        getAllCharacters: builder.query<ListResponse<Result>, number | void>({
            query: (page = 1) => `character?page=${page}`,
            // Only have one cache entry because the arg always maps to one string
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            // Always merge incoming data to the cache entry
            merge: (currentCache, newItems) => {
                currentCache.results.push(...newItems.results)
            },
            // Refetch when the page arg changes
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },


            providesTags: (result, error, page) =>
                result

                    ? [
                        // Provides a tag for each post in the current page,
                        // as well as the 'PARTIAL-LIST' tag.
                        ...result.results.map(({ id }) => ({ type: 'Characters' as const, id })),
                        { type: 'Characters', id: 'PARTIAL-LIST' },
                    ]
                    : [{ type: 'Characters', id: 'PARTIAL-LIST' }],
            // Invalidates the tag for this Post `id`, as well as the `PARTIAL-LIST` tag,
            // causing the `listPosts` query to re-fetch if a component is subscribed to the query.
            // invalidatesTags: (result, error, id) => [
            //     { type: 'Characters', id },
            //     { type: 'Characters', id: 'PARTIAL-LIST' },
            // ],
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