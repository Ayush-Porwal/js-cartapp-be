import mongoose from 'mongoose';
import reviewSchema from './review.schema.js';

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: 'Product name must be a non-empty string',
    },
  },
  productMrp: {
    type: Number,
    min: 0,
    required: true,
  },
  productSalePrice: {
    type: Number,
    min: 0,
  },
  productImages: {
    type: [String],
    default: [],
  },
  productIsOnSale: {
    type: Boolean,
    default: false,
    required: true,
  },
  productCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
  },
  productTags: {
    type: [String],
  },
  productRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  productReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reviews',
    },
  ],
  productDescription: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 10;
      },
      message: 'Product description must be at least 10 characters',
    },
  },
  productQuantityInStock: {
    type: Number,
    default: 0,
  },
});

// in case when product is not on sale, by default, we set sale price = mrp
productSchema.pre('save', function (next) {
  if (!this.productIsOnSale) {
    this.productSalePrice = this.productMrp;
  }
  next();
});

export default productSchema;
