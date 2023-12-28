import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  cartItems: [cartItemSchema],
});

export default cartSchema;
