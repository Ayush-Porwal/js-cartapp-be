import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
  },
  userRole: {
    type: String,
    default: "user",
  },
  // userMobile: {
  //   type: String,
  // },
  // userAddress: {
  //   type: String,
  // },
  // userCart: {
  //   type: [String],
  // },
});

export default userSchema;
