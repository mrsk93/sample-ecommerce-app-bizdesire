import { connectToDataBase } from '@/db/db';
import connectDB from '@/db/mongo';
import Product from '@/models/product';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export const revalidate = 0
export const fetchCache = 'force-no-store'

connectToDataBase()


export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
  try {
      await connectDB()
      const { id } = params
      //not making use of id here due to demo assignment 
      const product = await Product.find().limit(1);
      if (product.length === 0) {
        //saving dummy product for our use case
        const dummyProduct = new Product({
          "title": "Headphone pro max",
          "description": " This is Headphone pro max .This is the best headphone device from apple. It is little expensive",
          "price": 2000,
          "productImageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          });
        await dummyProduct.save();
        return NextResponse.json(dummyProduct,{ status: 200 });
      }
      return NextResponse.json(product[0],{ status: 200 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: 'Internal Server error' },{ status: 500 });
    }
}


  