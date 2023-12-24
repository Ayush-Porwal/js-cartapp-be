import mongoose from "mongoose";
import reviewSchema from "./review.schema.js";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  productMrp: {
    type: Number,
  },
  productSalePrice: {
    type: Number,
  },
  productImages: {
    type: [String],
  },
  productIsOnSale: {
    type: Boolean,
  },
  productCategory: {
    type: String,
  },
  productTags: {
    type: [String],
  },
  productRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  productReviews: {
    type: reviewSchema,
    // default: {}
  },
  productDescription: {
    type: String,
  },
  productQuantityInStock: {
    type: Number,
  },
});

export default productSchema;
