import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "@env"
// initialize an empty api service that we'll inject endpoints into later as needed
export const defaultSplitApi = createApi({
    reducerPath: "ReducerPath",

    //TODO Create an object for these tagtypes
    tagTypes: ["Characters", "CharactersByName", "CharactersByGender", "CharactersBySpecies","Locations"],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        // prepareHeaders: (headers) => {
        //     headers.set('Access-Control-Allow-Origin', '*')
        //     return headers
        // }
    }),
    endpoints: () => ({}),

})
