import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productImageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;