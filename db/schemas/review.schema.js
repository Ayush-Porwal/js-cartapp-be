import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewTitle: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 2 && value.length < 150;
      },
      message: 'Review title must be between 2 and 150 characters',
    },
  },
  reviewDescription: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 10;
      },
      message: 'Review text must be at least 10 characters',
    },
  },
  reviewRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  reviewLikes: {
    type: Number,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Review likes must be an integer, got: { VALUE }',
    },
  },
  reviewDislikes: {
    type: Number,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Review likes must be an integer, got: { VALUE }',
    },
  },
  reviewImages: {
    type: [String],
    default: [],
  },
});

export default reviewSchema;
