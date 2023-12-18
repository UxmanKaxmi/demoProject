import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"



// To save the filter in redux 
//0 = no filter
//1 = By Name
//2 = By Gender
//3 = By Species
export interface FilterState {
    value: Number
}

const initialState: FilterState = {
    value: 0
}

export const SelectedFilterSlice = createSlice({
    name: "isGrid",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }

    }

})

export const { setFilter } = SelectedFilterSlice.actions
export default SelectedFilterSlice.reducer
