
const ChatGPTClient = require('@waylaidwanderer/chatgpt-api');
const fs = require('fs/promises');
require('dotenv').config();

const clientOptions = {
    // (Optional) Support for a reverse proxy for the completions endpoint (private API server).
    // Warning: This will expose your `openaiApiKey` to a third party. Consider the risks before using this.
    // reverseProxyUrl: 'https://chatgpt.hato.ai/completions',
    // (Optional) Parameters as described in https://platform.openai.com/docs/api-reference/completions
    modelOptions: {
        // You can override the model name and any other parameters here.
        model: 'text-davinci-003',
        // Set max_tokens here to override the default max_tokens of 1000 for the completion.
        max_tokens: 1000,
    },
    // (Optional) Davinci models have a max context length of 4097 tokens, but you may need to change this for other models.
    // maxContextTokens: 4097,
    // (Optional) You might want to lower this to save money if using a paid model like `text-davinci-003`.
    // Earlier messages will be dropped until the prompt is within the limit.
    maxPromptTokens: 3097,
    // (Optional) Set custom instructions instead of "You are ChatGPT...".
    promptPrefix: "",
    // (Optional) Set a custom name for the user
    userLabel: 'User',
    // (Optional) Set a custom name for ChatGPT
    chatGptLabel: 'ChatGPT',
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
async function init_client() {
  try {
    return chatGptClient;
  } catch (err) {
    console.error("Error starting client:", err);
    return null;
  }
}

// Initialize first conv for a new user
async function init_conv(model_id) {
  try {
      const text = fs.readFileSync(`./initial-prompt-${model_id}.txt`, 'utf8'); 
      const response = await chatGptClient.sendMessage(text);
      console.log(response); 
      return response;
  } catch (err) {
    console.error("Error starting client:", err);
    return null;
  }
}

async function send_message(msg, conv_id, last_msg_id) {
  const response = await chatGptClient.sendMessage(msg, { conversationId: conv_id, parentMessageId: last_msg_id });
}



// Export the init_client function
module.exports = { init_client, init_conv, send_message };