import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"




export interface SearchState {
    value: string
}

const initialState: SearchState = {
    value: ""
}

export const SearchSlice = createSlice({
    name: "Search",
    initialState,
    reducers: {
        setSearchTextInRedux: (state, action: PayloadAction<string>) => {
            state.value = action.payload

        }

    }

})

export const { setSearchTextInRedux } = SearchSlice.actions
export default SearchSlice.reducer
