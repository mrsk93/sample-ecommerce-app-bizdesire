import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    products: [
      {
        productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    orderStatus: { type: String, enum: ["pending", "processing", "shipped", "delivered", "canceled"], default: "pending" },
  });

  const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;