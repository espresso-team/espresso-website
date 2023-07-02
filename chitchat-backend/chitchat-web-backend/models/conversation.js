import mongoose, { Schema } from "mongoose";
 
const conversationSchema = new Schema({
  user_id: String,
  model_id: String,
  conv_id: String,
  user_name: String,
  model_name: String,
  favorability: Number, // 好感度
  relationship: String, // 关系
  last_msg_id: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});
 
export const ConversationModel = mongoose.model("Conversation", conversationSchema);