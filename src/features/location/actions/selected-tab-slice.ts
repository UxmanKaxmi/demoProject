import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"




export interface SelectedTabState {
    selectedTab: number
}

const initialState: SelectedTabState = {
    selectedTab: -1
}

export const SelectedTabSlice = createSlice({
    name: "selectedTabIndex",
    initialState,
    reducers: {
        setSelectedTabInRedux: (state, action: PayloadAction<number>) => {
            state.selectedTab = action.payload

        }

    }

})

export const { setSelectedTabInRedux } = SelectedTabSlice.actions
export default SelectedTabSlice.reducer
