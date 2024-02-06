import { defaultSplitApi } from "@service/index"
import type { Result,Location } from '../types/location-types'
import { createSelector, current } from "@reduxjs/toolkit";



export const GetLocationApi = defaultSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLocation: builder.query<Location<Result>, { page: number}>({
            query: (arg) => {
                const { page } = arg;
                return `location/?page=${page}`
            },

            // Only have one cache entry because the arg always maps to one string
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

            providesTags: ["Locations"]
        }),
     
    }),
    overrideExisting: true,

})



// Export hooks for usage in functional components
export const { 
    useGetAllLocationQuery,
} = GetLocationApi
