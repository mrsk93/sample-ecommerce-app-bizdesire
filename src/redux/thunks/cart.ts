import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; 
import { setCart, setError, setLoading } from '../slices/cart-slice';
import { ICartItem, IProduct } from '@/utils/interfaces';

const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`;

export const fetchCart:any = createAsyncThunk('cart/fetchCart', async (_, { dispatch, rejectWithValue }) => {
  try {
    dispatch(setLoading());
    let cartId = window.localStorage.getItem('cartId'); 
    const response = await axios.get(`${apiEndpoint}/${cartId ?? null}`);
    window.localStorage.setItem('cartId',response.data.cartData._id);
    dispatch(setCart(response.data.cartData));
    return response.data; 
  } catch (error:any) {
    dispatch(setError(error.message)); 
    return rejectWithValue(error.message);
  }
});

export const updateCart:any = createAsyncThunk('cart/updateCart', async ({action,product}:any, { dispatch, rejectWithValue, getState }) => {
    try {
        let payload = {};
        const cartState = (getState() as any)?.cart;
        if(!cartState.loading){
            dispatch(setLoading());
            const productInBasket = cartState?.items?.products?.find((item:ICartItem)=> product._id === item.productID._id)
            if(!productInBasket){
                payload = {
                    products: [
                        ...cartState.items,
                        {
                            productID: product._id,
                            quantity: 1,
                        }
                    ]
                }
        } else {
            const updatedCartItems = (cartState.items.products as ICartItem[]).map(prodd=>{
                let prod = {...prodd}
                if(prod.productID._id === product._id){
                    action === "add" ? prod.quantity++ : prod.quantity--
                }
                return prod
            });
        payload = {...cartState, products: updatedCartItems}
        }
        let cartId = window.localStorage.getItem('cartId');
        const response = await axios.put(`${apiEndpoint}/${cartId ?? null}`,{cartData: payload});
        dispatch(setCart(response.data.cartData));
        window.localStorage.setItem('cartId',response.data.cartData._id); 
        return response.data; 
        }
    } catch (error:any) {
      dispatch(setError(error.message)); 
      return rejectWithValue(error.message);
    }
  });
