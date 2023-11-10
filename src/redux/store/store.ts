// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cart-slice';
import productsReducer from '../slices/products-slice';
import checkoutReducer from '../slices/checkout-slice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    checkout: checkoutReducer,
  },
});

export default store;
