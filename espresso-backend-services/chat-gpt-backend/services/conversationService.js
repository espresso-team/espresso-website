const ConversationModel = require("../models/conversation");
 
exports.createConversation = async (conv) => {
  return await ConversationModel.create(conv);
};
exports.getConvById = async (id) => {
  return await ConversationModel.findById(id);
};
 
exports.updateConv = async (id, conv) => {
  return await ConversationModel.findByIdAndUpdate(id, conv);
};
 
exports.deleteConv = async (id) => {
  return await ConversationModel.findByIdAndDelete(id);
};
