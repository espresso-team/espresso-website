import ChatGPTNodeClient from "./chatgpt-client.js";
import LangChainClient from "./langchain-client.js";

export const ChatClientType = {
  CHATGPT: "CHATGPT",
  LANGCHAIN: "LANGCHAIN",
};

export default class ChatClientFactory {
    static createChatClient(type, user_name, model_name, conv_id, model_id) {
        switch (type) {
        case ChatClientType.CHATGPT:
            return new ChatGPTNodeClient(user_name, model_name);
        case ChatClientType.LANGCHAIN:
            return new LangChainClient(conv_id, model_id);
        default:
            throw new Error("Invalid chat client type.");
        }
    }
};
