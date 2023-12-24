import mongoose from "mongoose";
import reviewSchema from "../schemas/review.schema.js";

const Reviews = mongoose.model("Reviews", reviewSchema);

export default Reviews;
