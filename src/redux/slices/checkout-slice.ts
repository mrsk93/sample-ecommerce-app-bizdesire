import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  },
  loading: false,
  success: false,
  orderPlaced: null,
  error: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { fieldName, value } = action.payload;
      (state as any).formData[fieldName] = value;
    },
    submitOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    submitOrderSuccess: (state,action) => {
      state.success = true;
      state.loading = false;
      state.formData = initialState.formData;
      state.orderPlaced = action.payload
    },
    submitOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateField, submitOrderRequest, submitOrderSuccess, submitOrderFailure } = checkoutSlice.actions;
export default checkoutSlice.reducer;