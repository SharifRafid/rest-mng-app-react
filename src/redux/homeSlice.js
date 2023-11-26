import { createSlice } from "@reduxjs/toolkit"

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        products: [],
        cartItems: [],
        wishListItems: [],
        orderItems: [],
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
    }
})

export const { setProductsData, setCartProductsData, setWishlistProductsData,setOrdersData } = homeSlice.actions
export default homeSlice.reducer