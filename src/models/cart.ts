import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [
      {
        productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
  });
  
  const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;