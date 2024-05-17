import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../src/utils/axios';

const initialState = {
    list: []
}


const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        setFetchCities: (state, {payload}) => {
            state.list = payload
        }
    }
})

const {setFetchCities} = citySlice.actions

export const fetchCities = () => {
    return async (dispatch) => {
        try {
            const {data} = await axiosInstance({
                method: 'get',
                url: '/cities',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            dispatch(setFetchCities(data))
        } catch (error) {
            console.log(error)
        }
    }
}
export default citySlice.reducer