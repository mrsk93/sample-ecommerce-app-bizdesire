import { createAsyncThunk } from "@reduxjs/toolkit";
import { submitOrderRequest, submitOrderSuccess, submitOrderFailure } from "../slices/checkout-slice";
import axios from "axios";

const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`;

export const submitOrder =  createAsyncThunk('checkout/submitOrder', async (total:any, { dispatch, rejectWithValue, getState }) => {
    try {
    dispatch(submitOrderRequest());
    const payload = {...(getState() as any)?.checkout?.formData, products: [...(getState() as any)?.cart?.items?.products],total}
    const response = await axios.post(`${apiEndpoint}`,{orderData: payload});
    dispatch(submitOrderSuccess(response.data.orderData)); 
    return response.data; 
    } catch (error:any) {
      console.log(error)
      dispatch(submitOrderFailure(error.message)); 
      return rejectWithValue(error.message);

    }
  });