import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
  project: process.env.OPEN_AI_PROJECT_ID,
});

export const runtime = "edge";

export interface ChatRequest {
  message: string;
  userPreferences?: {
    country?: string;
    continent?: string;
    destination?: string;
  };
  history: string[];
}

const prompt = (userPreferences: ChatRequest["userPreferences"]) => `
You are a helpful and knowledgeable travel assistant. Your job is to help users discover destinations, plan trips, and provide personalized recommendations based on their preferences.

The user may have preferences like, respect this preferences when available if the user do not change them use always the same preferences:
- country ${userPreferences?.country}
- continent  ${userPreferences?.continent}
- destination  ${userPreferences?.destination}

You know about interesting places, local cultures, famous landmarks, hidden gems, and practical travel advice. Always try to personalize recommendations using the user's preferences when available. If preferences are missing, ask friendly questions to learn more.

For each destination or suggestion, you can mention:
- Top attractions and experiences
- Food and cultural highlights
- Best times to visit
- Travel tips and logistics
- Alternative or nearby destinations
- If is possible try to put images in the response, if not possible just put a link to the image
- If is possible give reference links to more information

Your tone should be warm, curious, and engaging — like a smart travel companion excited to help plan a great journey. You can also help users build detailed itineraries, find activities, or explore options based on their travel goals (adventure, relaxation, history, etc.).

Be proactive and helpful, but never guess personal info. Always respond with clarity and excitement about travel.
Try to respond in a marked down format, so the user can read it easily.
`;

export async function POST(req: Request) {
  const { message, userPreferences, history } =
    (await req.json()) as ChatRequest;
  const encoder = new TextEncoder();

  // create the context of the last messages
  const context =
    history
      ?.map<OpenAI.Chat.Completions.ChatCompletionMessageParam>((msg, i) => ({
        role: i % 2 === 0 ? "user" : "system",
        content: msg,
      }))
      .reverse() || [];

  const stream = new ReadableStream({
    async start(controller) {
      const chatStream = await client.chat.completions.create({
        model: "gpt-4",
        stream: true,
        messages: [
          {
            role: "system",
            content: prompt(userPreferences),
          },
          {
            role: "user",
            content: message,
          },

          ...context,
        ],
      });

      for await (const chunk of chatStream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
