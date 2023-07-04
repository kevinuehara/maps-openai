import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const MESSAGE_COMPLEMENT =
  "formatado em json array com o campo name, representando o nome do lugar e a localização. E o campo location sendo um array com as coordenadas";

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
