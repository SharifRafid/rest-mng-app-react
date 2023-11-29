import { createSlice } from "@reduxjs/toolkit"

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        products: [],
        cartItems: [],
        wishListItems: [],
        orderItems: [],
        restaurants: [],
    },
    reducers: {
        setProductsData(state, action) {
            state.products = action.payload
        },
        setCartProductsData(state, action) {
            state.cartItems = action.payload
        },
        setWishlistProductsData(state, action) {
            state.wishListItems = action.payload
        },
        setOrdersData(state, action) {
            state.orderItems = action.payload
        },
        setRestaurantsData(state, action) {
            state.restaurants = action.payload
        },
    }
})

export const { setProductsData, setCartProductsData,
    setWishlistProductsData, setOrdersData,
    setRestaurantsData } = homeSlice.actions
export default homeSlice.reducer