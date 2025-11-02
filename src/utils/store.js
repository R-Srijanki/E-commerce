import {configureStore} from "@reduxjs/toolkit"
import cartReducer from '../utils/cartSlice'
import productReducer from '../utils/productSlice'
const store=configureStore({
    reducer:{
        cart:cartReducer,
        product:productReducer
    }
})
export default store;