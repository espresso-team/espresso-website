import { ConversationModel } from "../models/conversation.js";

export async function createConversation(conv) {
    return await ConversationModel.create(conv);
}
export async function getConv(condition) {
    return await ConversationModel.findOne(condition);
}

export async function updateConv(condition, conv) {
    return await ConversationModel.findOneAndUpdate(condition, conv);
}

export async function deleteConv(condition) {
    return await ConversationModel.findOneAndDelete(condition);
};
