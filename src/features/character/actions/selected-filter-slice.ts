import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"




export interface FilterState {
    value: String
}

const initialState: FilterState = {
    value: "Name"
}

export const SelectedFilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<String>) => {
            state.value = action.payload

        }

    }

})

export const { setFilter } = SelectedFilterSlice.actions
export default SelectedFilterSlice.reducer
