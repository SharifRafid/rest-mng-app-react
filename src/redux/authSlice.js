import { createSlice } from "@reduxjs/toolkit"

const todosSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: false,
        email: null,
        password: null,
    },
    reducers: {
        updateLoginState(state, action) {
            state.loggedIn = action.payload.loggedIn
            state.email = action.payload.email
            state.password = action.payload.password
        },
    }
})

export const { updateLoginState } = todosSlice.actions
export default todosSlice.reducer