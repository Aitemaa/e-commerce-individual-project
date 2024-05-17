import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/productSlice'
import orderReducer from '../features/orderSlice'
import productDetailReducer from '../features/productDetailSlice'
import userReducer from '../features/userSlice'
import cityReducer from '../features/citySlice'
import paymentReducer from '../features/paymentSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
    productDetail: productDetailReducer,
    user: userReducer,
    cities: cityReducer,
    payment: paymentReducer
  },
})