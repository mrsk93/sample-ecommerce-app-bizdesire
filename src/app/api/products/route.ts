import { connectToDataBase } from '@/db/db';
import connectDB from '@/db/mongo';
import Product from '@/models/product';
import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'

export const revalidate = 0
export const fetchCache = 'force-no-store'

connectToDataBase()

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const products = await Product.find();
    return NextResponse.json({products},{ status: 200 })
  } catch (error: any) {
    return NextResponse.json({ msg: 'Internal Server Error!!!' })
  }
}

export async function POST(req: NextRequest) {
  try {
    const productData = await req.json()
    await connectDB()
    const newProduct = new Product(productData);
    await newProduct.save();
    return NextResponse.json(newProduct,{ status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Server error' },{ status: 500 });
  }
}
  