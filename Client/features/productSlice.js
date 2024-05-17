import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../src/utils/axios';

const initialState = {
  list: [],
  page: 1,
  hasMore: true,
  search: ''
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFetchProducts: (state, { payload }) => {
      if (payload.page === 1) {
        state.list = payload.data; 
      } else {
        state.list = [...state.list, ...payload.data];
      }
      state.page = payload.page;
      state.hasMore = payload.hasMore;
    },
    resetProducts: (state) => {
      state.list = [];
      state.page = 1;
      state.hasMore = true;
    },
    setSearch: (state, {payload}) => {
        state.search = payload
    }
  }
})

export const { setSearch, setFetchProducts, resetProducts } = productSlice.actions;

export const fetchProducts = (page = 1, limit = 3) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: 'get',
        url: `/products?page=${page}&limit=${limit}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      const hasMore = data.totalPages > page;
      dispatch(setFetchProducts({ data: data.data, page, hasMore }));
    } catch (error) {
      console.log(error);
    }
  }
}

export const resetProductList = () => (dispatch) => {
  dispatch(resetProducts());
}

export default productSlice.reducer;
