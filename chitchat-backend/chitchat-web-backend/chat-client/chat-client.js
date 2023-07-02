// Base class for chat clients

export default class ChatClient {

  async join_chat(user_id, model_id) {
    throw new Error("join_chat method not implemented.");
  }

  async send_chat_message(message, user_id, model_id) {
    throw new Error("send_chat_message method not implemented.");
  }
}
