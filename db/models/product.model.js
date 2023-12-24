import mongoose from "mongoose";
import productSchema from "../schemas/product.schema.js";

const Products = mongoose.model("Products", productSchema);

export default Products;
