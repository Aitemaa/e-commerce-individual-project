import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../src/utils/axios';

const initialState = {
  data: {},
};


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setFetchOrders: (state, {payload}) => {
            state.data = payload
        }
    }
})

const {setFetchOrders} = orderSlice.actions;

export const fetchOrders = () => {
    return async (dispatch) => {
        try {
            const {data} = await axiosInstance({
                method: 'get',
                url: '/orders?filter=onCart',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            dispatch(setFetchOrders(data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteProductFromCart = (id) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosInstance({
                method: 'delete',
                url: `/orders/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            console.log(data)
            dispatch(fetchOrders());
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateProductFromCart = (id, size) => {
    return async (dispatch) => {
        try {
            const {data} = await axiosInstance({
                method: 'PATCH',
                url: `/orders/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                data: {size}
            })
            console.log(data)
            dispatch(fetchOrders());
        } catch (error) {
            console.log(error)
        }
    }
}
export default orderSlice.reducer