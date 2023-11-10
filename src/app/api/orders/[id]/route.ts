import { connectToDataBase } from '@/db/db';
import connectDB from '@/db/mongo';
import Order from '@/models/order';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export const revalidate = 0
export const fetchCache = 'force-no-store'

connectToDataBase()

export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  try {
      await connectDB()
      const { id } = params
      const order = await Order.findById(id);
      if (!order) {
        return NextResponse.json({ message: 'Order not found' },{ status: 404 });
      }
      return NextResponse.json(order,{ status: 200 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: 'Internal Server error' },{ status: 500 });
    }
}



  