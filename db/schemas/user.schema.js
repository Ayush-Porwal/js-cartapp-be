import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return value.length > 5 && value.length < 50;
        },
        message: 'Username must be between 5 and 50 characters',
      },
    },
    userEmail: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^\S+@\S+$/.test(value);
        },
        message: 'Please enter a valid email, got: { VALUE }',
      },
    },
    userPassword: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      default: 'user',
      enum: ['user', 'seller'],
    },
    userListedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
    ],
    userMobile: {
      type: String,
    },
    userAddress: {
      type: String,
    },
    userCart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Carts',
    },
    userAvatar: {
      type: String,
    },
  },
  { timestamps: true }
);

export default userSchema;
