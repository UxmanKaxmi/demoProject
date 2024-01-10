import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { FILTER_CHARACTER } from "../constants"




export interface GenderState {
    value: string
}

const initialState: GenderState = {
    value: ""
}

export const GenderSlice = createSlice({
    name: FILTER_CHARACTER.NAME,
    initialState,
    reducers: {
        setGender: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }

    }

})

export const { setGender } = GenderSlice.actions
export default GenderSlice.reducer
