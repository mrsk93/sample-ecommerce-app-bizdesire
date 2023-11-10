"use client"

import { fetchCart } from '@/redux/thunks/cart';
import { eProductCards } from '@/utils/enums';
import { ICartItem } from '@/utils/interfaces';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';

function Cart() {
    const dispatch = useDispatch();
    const {items, isLoading, error} : {items: {products: ICartItem[]}, isLoading: boolean, error:any} = useSelector((state:any) => state.cart);
    
    useEffect(() => {
      dispatch(fetchCart());
    }, [dispatch]);

    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
        <div className="cart-section">
          <div className="cart-header flex">
            <h1>Cart Items</h1>
            <div className="cart-checkout">
              <Link href="/checkout">
                <button type="button">Checkout</button>
              </Link>
            </div>
          </div>
          <div className="cart-items">
            {items?.products?.map(item=><ProductCard key={item._id} cardType={eProductCards.CART_ITEMS_CARD} product={item.productID} quantity={item.quantity}/>)}
          </div>
        </div>
      );
}

export default Cart