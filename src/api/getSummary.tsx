import axios, { AxiosRequestConfig } from "axios";

// Define the response structure for the "openai" provider
interface OpenAIResponse {
  cost: number;
  result: string;
  status: string;
}

// Define the full API response type
interface ApiResponse {
  openai?: OpenAIResponse;
}

export async function getSummary(text: string): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;

    const options: AxiosRequestConfig = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/summarize",
      headers: {
        authorization: `Bearer ${apiKey}`,
      },
      data: {
        output_sentences: 1,
        providers: ["openai"],
        text,
        language: "en",
      },
    };

    // Await the response with type safety
    const response = await axios.request<ApiResponse>(options);

    // Return only the summarized text from OpenAI
    return response.data.openai?.result || null;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return null;
  }
}
