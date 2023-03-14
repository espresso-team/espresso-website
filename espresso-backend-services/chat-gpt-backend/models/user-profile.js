import mongoose, { Schema } from "mongoose";
 
const userProfileSchema = new Schema({
  user_id: String,
  user_name: String,
  email: String,
  phone: String,
  gender: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});
 
export const UserModel = mongoose.model("UserProfile", userProfileSchema);