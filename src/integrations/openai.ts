import OpenAIClient from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export class OpenAI {
  private openai: OpenAIClient;

  constructor(key: string | undefined) {
    this.openai = new OpenAIClient({ apiKey: key });
  }

  async chatCompletion(model: string, messages: ChatCompletionMessageParam[]) {
    const response = await this.openai.chat.completions.create({
      model,
      messages,
    });

    return response;
  }

  async generalAssistant(messages: ChatCompletionMessageParam[]) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a very usefull assistant for me that knows everything about everything.",
        },
        ...messages,
      ],
    });

    return response;
  }

  async listModels() {
    const availableModels = ["gpt-4o", "gpt-4o-mini", "gpt-4.1"];
    const models = await this.openai.models.list();
    return models.data.filter((model) => availableModels.includes(model.id));
  }

  async generateChatTitle(message: string) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Generate a short title between 3-8 words for a chat with the following message: ",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return response;
  }

  async createAssistant(name: string, instructions: string) {
    const assistant = await this.openai.beta.assistants.create({
      name,
      instructions,
      model: "gpt-4o-mini",
    });
    return assistant;
  }
}

