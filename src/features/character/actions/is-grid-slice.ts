import { createSlice } from "@reduxjs/toolkit"
import { FLATLIST_VIEW } from "../constants"



// This is used for setting the view in the tab as Grid or List in redux
export interface GridState {
    value: Boolean
}

const initialState: GridState = {
    value: false
}

export const isGridSlice = createSlice({
    name: FLATLIST_VIEW.GRID,
    initialState,
    reducers: {
        setIsGrid: (state) => {
            state.value = !state.value
        }
    }

})

export const { setIsGrid } = isGridSlice.actions
export default isGridSlice.reducer
