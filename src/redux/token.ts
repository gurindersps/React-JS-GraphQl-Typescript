/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"

type State = {
    value: any
}

const initialState: State = {
    value: null,
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        addToken: (state, action) => {
            // eslint-disable-next-line no-param-reassign
            state.value = action.payload
        },
        resetToken: (state) => {
            // eslint-disable-next-line no-param-reassign
            state.value = initialState.value
        },
    },
})

export const { addToken, resetToken } = tokenSlice.actions

export const selectToken = (state: any) => state.token.value

export default tokenSlice.reducer
