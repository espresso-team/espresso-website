import { OpenAI } from "langchain/llms";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { getConvByConvId } from "../services/conversationService.js";
import { getModelByModelId } from "../services/modelProfileService.js";
import { templates } from "./templates/prompt-templates.js";
import RedisMemory from "./memory/redis-memory.js";
import ChatClient from "./chat-client.js";

class LangChainClient extends ChatClient {
  constructor(conv_id, model_id) {
    super();
    this.llm = new OpenAI();
    this.memory = new RedisMemory(conv_id);
    this.model_id = model_id;
  }

  async init_conv() {
    this.chat = new ChatOpenAI({
      streaming: true,
      verbose: true,
      modelName: "gpt-3.5-turbo",
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token) {
          channel.publish({
            data: {
              event: "response",
              token: token,
              interactionId,
            },
          });
        },
        async handleLLMEnd(result) {
          channel.publish({
            data: {
              event: "responseEnd",
              token: "END",
              interactionId,
            },
          });
        },
      }),
    });
    this.promptTemplate = new PromptTemplate({
      template: templates.qaTemplate,
      inputVariables: [
        "relationship",
        "favorability",
        "morality",
        "senseOfHumor",
        "age",
        "user_name",
        "model_name",
        "occupation",
        "location",
        "hometown",
        "language",
        "personality",
        "appearance",
        "conversationHistory",
        // "context", TODO: add context
        "question",
      ],
    });
    this.chain = new LLMChain({
      prompt: promptTemplate,
      llm: chat,
      memory: this.memory,
    });
  }

  async send_message(msg) {
    // logic to send a message in the conversation
    try {
      var modelProfile = await getModelByModelId(this.model_id);
      var convProfile = await getConvByConvId(this.conv_id);

      const res = await this.chain.call({
        relationship: convProfile.relationship,
        favorability: convProfile.favorability,
        morality: modelProfile.morality,
        senseOfHumor: modelProfile.senseOfHumor,
        age: modelProfile.age,
        user_name: convProfile.user_name,
        model_name: convProfile.model_name,
        occupation: modelProfile.occupation,
        location: modelProfile.location,
        hometown: modelProfile.location,
        language: modelProfile.language,
        personality: modelProfile.personality,
        appearance: modelProfile.appearance,
        conversationHistory,
        summary,
        msg,
      });
      console.log("Response is: " + res);
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  async send_chat_message(message, user_id, model_id) {
    throw new Error("send_chat_message method not implemented.");
  }
}

export default LangChainClient;
