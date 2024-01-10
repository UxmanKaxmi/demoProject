import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { FILTER_CHARACTER } from "../constants"




export interface FilterState {
    value: String
}

const initialState: FilterState = {
    value: FILTER_CHARACTER.NAME
}

export const SelectedFilterSlice = createSlice({
    name: "Filter",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<String>) => {
            state.value = action.payload

        }

    }

})

export const { setFilter } = SelectedFilterSlice.actions
export default SelectedFilterSlice.reducer
