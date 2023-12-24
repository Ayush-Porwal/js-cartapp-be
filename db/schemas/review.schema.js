import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
  },
  reviewRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
});

export default reviewSchema;
