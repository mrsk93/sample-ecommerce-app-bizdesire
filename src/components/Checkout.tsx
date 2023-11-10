"use client"

import { updateField } from '@/redux/slices/checkout-slice';
import { fetchCart } from '@/redux/thunks/cart';
import { submitOrder } from '@/redux/thunks/checkout';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Checkout() {
    const { items, } = useSelector((state: any) => state?.cart);
    const { formData, loading, error, success } = useSelector((state: any) => state?.checkout);
    const dispatch = useDispatch<any>();
    const router = useRouter()
    
    useEffect(() => {
      dispatch(fetchCart());
    }, [dispatch]);
  
    const total = useMemo(() => {
      return items?.products?.reduce((total: number, prod: { productID: { price: number; }; quantity: number; }) => {
        return total + prod.productID.price * prod.quantity;
      }, 0);
    }, [items]);
  
    const handleFieldChange = (fieldName: string, value: string) => {
      dispatch(updateField({ fieldName, value }));
    };
  
    const handleSubmit = (e: { preventDefault: () => void }) => {
        dispatch(submitOrder(total))
  
    };
  
    if(success){
      router.push('/order-received');
    }
  
  
  
    return (
      <div>
        <h1>Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-products">
            <h2>Products</h2>
            <table>
              <tbody>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
                {items?.products?.map((product:any)=><tr key={product._id}>
                  <td>{product.productID.title} X ({product.quantity})</td>
                  <td>${product.productID.price}</td>
                </tr>)}
              </tbody>
            </table>
            <p className="checkout-total">Total: ${total}</p>
          </div>
          <div className="checkout-personal-info">
            <h2>Personal Information</h2>
            <form >
              <div className="form-field">
                <label htmlFor="first-name">First Name:</label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="last-name">Last Name:</label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                />
              </div>
              <button type="button" disabled={loading} onClick={(e) => {handleSubmit(e)}}>
                {loading ? 'Submitting...' : 'Place Order'}
              </button>
              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    )
}

export default Checkout