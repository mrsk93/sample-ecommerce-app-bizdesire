"use client"

import React from 'react'
import Image from 'next/image'
import { eProductCards } from '@/utils/enums'
import { ICartItem, IProduct } from '@/utils/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '@/redux/thunks/cart'

function ProductCard({ cardType = eProductCards.PRODUCT_DETAIL_CARD, product, quantity }: {cardType?: eProductCards, product: IProduct, quantity?:number }) {
    const dispatch = useDispatch();

    const onUpdateCart = (action:"add"|"remove", ) => {
        dispatch(updateCart({action,product}))
    }

    return (
    <div className="flex product-card">
        <div className="product-image">
         <Image
            src={product?.productImageUrl}
            width={500}
            height={500}
            priority
            alt="Product Image"

        /> 
        </div>
        <div>
            <h3 className="product-title">
                {product?.title}
            </h3>
            <p className="product-description">
                {product?.description}
            </p>
            <div className="product-price">
                <span className="product-price-currency">$</span>
                <span className="product-price-amount"> {product?.price} </span>
            </div>
            <div className="product-actions">
                {cardType === eProductCards.PRODUCT_DETAIL_CARD && <button className="product-actions-add" type="button" onClick={(e)=>{onUpdateCart("add")}}>Add To Cart</button>}
                {cardType === eProductCards.CART_ITEMS_CARD && <button className="product-actions-add" type="button" onClick={(e) => {onUpdateCart("add")}}>+</button>}
                {cardType === eProductCards.CART_ITEMS_CARD && <button className="product-actions-count" type="button">{quantity}</button>}
                {cardType === eProductCards.CART_ITEMS_CARD && <button className="product-actions-subtract" type="button" onClick={(e) => {onUpdateCart("remove")}}>-</button>}
            </div>
        </div>
    </div>
  )
}

export default ProductCard