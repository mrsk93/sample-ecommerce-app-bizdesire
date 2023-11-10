import ProductCard from "@/components/ProductCard";
import { eProductCards } from "@/utils/enums";


async function getData() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/products/some-id`); 
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    throw new Error('Error occured fetching data')
  }
}

export default async function Page() {

  const data = await getData()

  return (
    <div className="product">
      <h1>Product Detail</h1>
      <ProductCard 
        cardType={eProductCards.PRODUCT_DETAIL_CARD}
        product={data}
        />
    </div>
  )
}

