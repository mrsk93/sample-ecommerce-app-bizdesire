import { connectToDataBase } from '@/db/db';
import connectDB from '@/db/mongo';
import Cart from '@/models/cart';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export const revalidate = 0
export const fetchCache = 'force-no-store'
 
connectToDataBase()

export async function GET(req: NextRequest,{ params }: { params: { id: string }}) {
  try {
      await connectDB();
      const { id } = params;
      if (id === 'null'||id === 'undefined') {
        // save a cart for the first time use for demo app
        const seedNewCart = new Cart()
        const newCart = await seedNewCart.save()

        return NextResponse.json({ cartData: newCart },{ status: 200 });
      }
      const cartData = await Cart.findOne({_id:id}).populate({path: 'products', populate: {path: 'productID'}});
      return NextResponse.json({cartData},{ status: 200 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: 'Internal Server error' },{ status: 500 });
    }
}

export async function PUT(req: NextRequest,{ params }: { params: { id: string }}) {
    try {
        await connectDB()
        const res = await req.json()
        const { cartData } = res;
        const id = params.id !== "null" ? params.id : null;
        const newCart = await Cart.findOneAndUpdate(id ? {_id:id} : {} , cartData , { new: true, upsert: true },).populate({path: 'products', populate: {path: 'productID'}});
        return NextResponse.json({cartData: newCart},{ status: 200 });
      } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server error' },{ status: 500 });
      }
  }