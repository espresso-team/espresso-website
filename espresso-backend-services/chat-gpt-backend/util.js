const postpone_words_list = ["哎呀...人家不知道嘛...洗澡去了88~", "手机信号不好，等会儿再聊！", "emmmm", "啊咧？", "哎呀，你好无聊呀~换个话题不"]

export function build_chat_history_for_frontend(chat_history) {
    var chat_history_for_frontend = [];
    chat_history.forEach(chat => {
    
  });
  return chat_history_for_frontend;
}

export function return_postpone_words() {
    return postpone_words_list[Math.floor(Math.random()*postpone_words_list.length)];
}

export function is_response_include_forbidden_words(res_message) {
    if (res_message.includes('ChatGPT') || res_message.includes('AI') ||
        res_message.includes('语言模型') || res_message.includes('很抱歉') || 
        res_message.includes('机器人') || res_message.includes('没有情感')){
            return true;
        }
}