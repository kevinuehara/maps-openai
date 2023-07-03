import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const MESSAGE_COMPLEMENT =
  "formatado com o nome do lugar - Nome: [nome do lugar] - LOC: coordenadas separadas por vírgula";

export class Openai {
  static async listModels() {
    const openai = new OpenAIApi(configuration);
    const response = await openai.listModels();
    return response;
  }

  static async getLocations(message: string) {
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message} ${MESSAGE_COMPLEMENT}`,
        max_tokens: 500,
        temperature: 0,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
