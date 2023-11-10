"use client"
import React from 'react'
import { useSelector } from 'react-redux';

function OrdersReceived() {
    const { orderPlaced } = useSelector((state: any) => state?.checkout);

    return (
      <div className="order-confirmation-container">
        <h1>Order Received</h1>
        <div className="order-confirmation">
          <p>
            Thank you for your order! Your order has been received and is being
            processed.
          </p>
          <p>Your order details:</p>
          <div>
            <div>
              <strong>Order Number:</strong> {orderPlaced?._id}
            </div>
            <div>
              <strong>Total Amount:</strong> ${orderPlaced?.total}
            </div>
            <div>
              <strong>Shipping Address:</strong> {orderPlaced?.address}
            </div>
          </div>
        </div>
      </div>
    );
}

export default OrdersReceived