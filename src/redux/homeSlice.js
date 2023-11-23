import { createSlice } from "@reduxjs/toolkit"

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        showToast: false,
        productsData: [],
        resId: null,
        time: 0,
    },
    reducers: {
        showToast(state, action) {
            state.showToast = action.payload
        },
        setProductsData(state, action) {
            state.productsData = action.payload
        },
        addProductItem(state, action) {
            state.productsData.push(action.payload)
        },
        setRestaurantId(state, action) {
            state.resId = action.payload
        },
        setRestaurantIdTime(state, action) {
            state.time = action.payload
        }
    }
})

export const { showToast, setProductsData, addProductItem,
    setRestaurantId,setRestaurantIdTime } = homeSlice.actions
export default homeSlice.reducer