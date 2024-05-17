import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../src/utils/axios';

const initialState = {
  data: {},
};

    
const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        setFetchProductDetail: (state, {payload}) => {
            state.data = payload
        }
    }
})

const {setFetchProductDetail} = productDetailSlice.actions;

export const fetchProductDetail = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosInstance({
                method: 'get',
                url: `/products/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            dispatch(setFetchProductDetail(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const addProductDetail = (size, productId) => {
    return async () => {
            await axiosInstance({
                method: 'post',
                url: `/orders/addToCart/${productId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {size}
            })
    }
}


export default productDetailSlice.reducer