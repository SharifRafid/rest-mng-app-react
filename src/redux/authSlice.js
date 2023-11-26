import { createSlice } from "@reduxjs/toolkit"

const todosSlice = createSlice({
    name: 'auth',
    initialState: {
        loggedIn: null,
        email: null,
        password: null,
        name: null,
        restaurantId: null,
        isCustomer: false,
    },
    reducers: {
        updateLoginState(state, action) {
            state.loggedIn = action.payload.loggedIn
            state.email = action.payload.email
            state.password = action.payload.password
            state.name = action.payload.name
            state.restaurantId = action.payload.restaurantId
        },
        updateConsumerLoginState(state, action) {
            state.loggedIn = action.payload.loggedIn
            state.email = action.payload.email
            state.password = action.payload.password
            state.name = action.payload.name
        },
        setUserIsLoggedIn(state, action) {
            state.loggedIn = action.payload
        },
        setCustomerRestaurantId(state, action) {
            state.restaurantId = action.payload
            state.isCustomer = true
            state.loggedIn = false
        }
    }
})

export const { updateLoginState, setUserIsLoggedIn, setCustomerRestaurantId, updateConsumerLoginState } = todosSlice.actions
export default todosSlice.reducer