import { ChatHistoryModel } from "../models/chat-history.js";

export async function insertChat(chat) {
    return await ChatHistoryModel.create(chat);
}
export async function getChatHistoryByConvId(conv_id) {
    return await ChatHistoryModel.find({conv_id: conv_id});
}

export async function deleteConv(chat) {
    return await ConversationModel.findOneAndDelete(chat);
};
