export function build_chat_history_for_frontend(chat_history) {
    var chat_history_for_frontend = [];
    chat_history.forEach(chat => {
    
  });
  return chat_history_for_frontend;
}

export function is_response_include_forbidden_words(res_message) {
    if (res_message.includes('ChatGPT') || res_message.includes('AI') ||
        res_message.includes('语言模型') || res_message.includes('很抱歉') || 
        res_message.includes('聊天机器人')) {
            return true;
        }
}