export interface IProduct{
    _id: string,
    title: string,
    description: string,
    price: number,
    productImageUrl: string
  }

export interface ICartItem {
  productID: IProduct,
  quantity: number,
  _id: string
}
  