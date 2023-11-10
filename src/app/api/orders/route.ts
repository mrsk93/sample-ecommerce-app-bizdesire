import { connectToDataBase } from '@/db/db';
import connectDB from '@/db/mongo';
import Order from '@/models/order';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export const revalidate = 0
export const fetchCache = 'force-no-store'


connectToDataBase()

export async function POST(req: NextRequest) {
    try {
        const res = await req.json()
        const { orderData } = res;
        await connectDB()
        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();
        return NextResponse.json({orderData: savedOrder},{ status: 200 });
      } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server error' },{ status: 500 });
      }
  }