import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"




export interface PageCountState {
    pageCount: number
}

const initialState: PageCountState = {
    pageCount: 1
}

export const SearchSlice = createSlice({
    name: "PageCount",
    initialState,
    reducers: {
        setPageCountInRedux: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload

        }

    }

})

export const { setPageCountInRedux } = SearchSlice.actions
export default SearchSlice.reducer
