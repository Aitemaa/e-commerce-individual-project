import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../src/utils/axios';

const initialState = {
    data: {},
  };

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFetchUser: (state, {payload}) => {
            state.data = payload;
        }
    }
  })

  const {setFetchUser} = userSlice.actions;

  export const fetchUser = () => {
    return async (dispatch) => {
        try {
            const {data} = await axiosInstance({
                method: 'get',
                url: '/userDetails',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
        dispatch(setFetchUser(data))
        return data;
        } catch (error) {
            console.log(error)
        }
    }
  }

 export const addUserDetail = (newUser) => {
    return async () => {
        try {
            const {data} = await axiosInstance({
                method: 'PUT',
                url: '/userDetails',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                data: newUser
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
  }


  export default userSlice.reducer;