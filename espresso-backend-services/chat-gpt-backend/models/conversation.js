const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const conversationSchema = new Schema({
  // HASH(user_id, model_id)
  id: String,
  user_id: String,
  conv_id: String,
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
 
module.exports = mongoose.model("Conversation", conversationSchema);