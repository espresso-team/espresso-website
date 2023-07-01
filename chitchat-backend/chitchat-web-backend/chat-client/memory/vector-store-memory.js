import { VectorStoreRetrieverMemory } from "langchain/memory";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

class VectorStoreMemory {
  constructor(conv_id, doc_size) {
    this.vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());
    this.memory = new VectorStoreRetrieverMemory({
      // 1 is how many documents to return, you might want to return more, eg. 4
      vectorStoreRetriever: this.vectorStore.asRetriever(doc_size),
      memoryKey: conv_id,
    });
  }

  async saveContext(input, output) {
    await this.memory.saveContext({ input: input },
    { output: output });
  }

  async loadMemoryVariables(prompt) {
    return await this.memory.loadMemoryVariables({ prompt: prompt });
  }
}

export default VectorStoreMemory;
