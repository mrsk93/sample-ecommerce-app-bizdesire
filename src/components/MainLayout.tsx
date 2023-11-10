"use client"
import Link from 'next/link'
import React from 'react'

function MainLayout() {
  return (
    <div className="top-navbar">
        <div className="logo">
            Logo
        </div>
        <div className="navbar">
            <div className="products">
                <Link href="/products">
                    <button type="button">Products</button>
                </Link>
            </div>
            <div className="cart">
                <Link href="/cart">
                    <button type="button">Cart</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default MainLayout