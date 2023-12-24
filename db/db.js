import mongoose from "mongoose";

const mongooseClient = await mongoose.connect(process.env.DATABASE_URL);

export default mongooseClient;
