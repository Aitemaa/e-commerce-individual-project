import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../src/utils/axios";

const initialState = {};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
});

export const createMidtransOrder = () => {
  return async () => {
    try {
      const { data } = await axiosInstance({
        method: "GET",
        url: "/payments/midtrans/initate",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export default paymentSlice.reducer;
