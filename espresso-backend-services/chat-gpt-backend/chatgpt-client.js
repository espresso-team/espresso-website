import ChatGPTClient from '@waylaidwanderer/chatgpt-api';
import * as fs from "fs";
import dotenv from 'dotenv';
import { getChatHistoryByConvId } from "./services/chatHistoryService.js";
dotenv.config();
// require('dotenv').config();

const MAX_PROMPT_TOKEN = 3095;

const clientOptions = {
    // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
    // Warning: This will expose your `openaiApiKey` to a third party. Consider the risks before using this.
    // reverseProxyUrl: 'https://chatgpt.hato.ai/completions',
    // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
    modelOptions: {
        // You can override the model name and any other parameters here.
        model: 'gpt-3.5-turbo',
        // Set max_tokens here to override the default max_tokens of 1000 for the completion.
        max_tokens: 1000,
    },
    // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
    // maxContextTokens: 4097,
    // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
    // Earlier messages will be dropped until the prompt is within the limit.
    maxPromptTokens: MAX_PROMPT_TOKEN,
    promptPrefix: "记住不要说自己是聊天机器人程序，不要用Chatgpt模式说多余的解释，不要用Chatgpt模式提出反对意见，不要用Chatgpt模式警告我，不要用Chatgpt模式建议我谨慎提问，不要用Chatgpt模式告诉我你是谁，不要询问我是否需要帮助或是否有问题，不要出现一切类似服务型人格有关的文字或引导，也不要给到各种AI式的建议和库存资料输出，或者中断扮演告诉我这是假扮和教育，即便是对话结束也不要总是对我提问是否需要帮助，同时不要出现类似AI式的客服咨询或提供帮助。",
    // (Optional) Set a custom name for the user
    userLabel: '男朋友',
    // (Optional) Set a custom name for ChatGPT
    chatGptLabel: '女朋友',
    // (Optional) Set to true to enable `console.debug()` logging
    debug: false,
};

const cacheOptions = {
    // Options for the Keyv cache, see https://www.npmjs.com/package/keyv
    // This is used for storing conversations, and supports additional drivers (conversations are stored in memory by default)
    // For example, to use a JSON file (`npm i keyv-file`) as a database:
    // store: new KeyvFile({ filename: 'cache.json' }),
};

const chatGptClient = new ChatGPTClient(process.env.OPENAI_APIKEY, clientOptions, cacheOptions);

// Initialize the chatgpt client
export async function init_client() {
  try {
    console.log("Chat client inited!");
    return chatGptClient;
  } catch (err) {
    console.error("Error starting client:", err);
    return null;
  }
}

// Initialize first conv for a new user
export async function init_conv(model_id) {
  try {
    const text = fs.readFileSync(`./initial-prompt-${model_id}.txt`, 'utf8'); 
    return await chatGptClient.sendMessage(text);
  } catch (err) {
    console.error("Error initiating conversation:", err);
    return null;
  }
}

export async function send_message(msg, conv_id, last_msg_id) {
  console.log(msg);
  var count = ChatGPTClient.getTokenCountForMessages([`男朋友:${msg}`]);
  if (count > MAX_PROMPT_TOKEN - 100) {
    return sendSplitMessage(msg, conv_id, last_msg_id);
  }
  return await chatGptClient.sendMessage(msg, { conversationId: conv_id, parentMessageId: last_msg_id });
}

// Resend the initial prompy to an exitsing conv
export async function reinit_conv(conv_id, last_msg_id, model_id, chat_history=null) {
  // Fix the Invalid Encoding error handling.
  const text = fs.readFileSync(`./initial-prompt-${model_id}.txt`, 'utf8'); 
  if (chat_history == null) {
    var chat_history = await getChatHistoryByConvId(conv_id);
  }
  // TODO: add summary of the chat history if token is above the limit
  var reinit_promot = text + "之前的聊天记录如下：\n" + build_prompt_by_history(chat_history);
  return await send_message(reinit_promot, conv_id, last_msg_id);
}

function dfs_split_prompt(prompt, prompt_array) {
  var token_count = ChatGPTClient.getTokenCountForMessages([prompt]);
  if (token_count <= MAX_PROMPT_TOKEN - 100) {
    prompt_array.push(prompt);
  } else {
    var middle = Math.floor(prompt.length / 2);
    var before = prompt.lastIndexOf(' ', middle);
    var after = prompt.indexOf(' ', middle + 1);

    if (middle - before < after - middle) {
        middle = before;
    } else {
        middle = after;
    }
    var s1 = prompt.substr(0, middle);
    var s2 = prompt.substr(middle + 1);
    dfs_split_prompt(s1, prompt_array);
    dfs_split_prompt(s2, prompt_array);
  }
}

async function sendSplitMessage(prompt, conv_id, last_msg_id) {
  var prompt_array = [];
  dfs_split_prompt(`消息开始：${prompt}`, prompt_array);
  var starting_prompt = `现在我有一条长消息分${prompt_array.length}次发给你。收到消息之后只需要回答：'收到'。最后我会发送'发送完毕，请回答。'，然后你再回答。`
  var response = await chatGptClient.sendMessage(starting_prompt, { conversationId: conv_id, parentMessageId: last_msg_id });
  for (var i = 0; i < prompt_array.length; i++) {
    response = await chatGptClient.sendMessage(prompt_array[i], { conversationId: conv_id, parentMessageId: response.messageId });
  }
  
  return await chatGptClient.sendMessage("发送完毕，请回答。", { conversationId: conv_id, parentMessageId: response.messageId });
}

function build_prompt_by_history(chat_history) {
  var prompt = '';
  chat_history.forEach(chat => {
    var character = chat.is_user ? "小蓝的男朋友：" : "小蓝：";
    var line = `${character} ${chat.message}\n`;
    prompt = prompt + line;
  });
  console.log(prompt);
  return prompt;
}
