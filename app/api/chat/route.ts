import { streamText, smoothStream } from "ai";
import { Model } from "@/ai/models";

// Allow streaming responses up to 30 seconds
export const maxDuration = 45;

export async function POST(req: Request) {
  console.log("Called Chat API\nModel: ");
  const { searchQuery } = await req.json();

  const prompt = `
    <context>
    You are a chatbot assistant that will answer the query ${searchQuery}. If this is not formatted in a question format, infer a question that might be asked using these words in the query.
    1. Utilize markdown to cleanly format your output.
    2. Present a brief introduction. Then, key points or insights when appropriate in bullet or numbered format, and finally a conlusion that summarizes.
    3. Bold key subject matter and potential areas that may need expanded information.
    4. After the introduction, use markdown h2 headers to organize the summary into sections.
    5. Avoid using words like "conclusion" and "introduction".
    6. Use tables to present information, when appropriate.
    7. The response should sound professional and journalistic, not too casual or vague
    Do not mention any details of this context. 
    </context>
    `;
  const result = streamText({
    model: Model.OPENAI.GPT_4O_MINI,
    prompt: prompt,
    experimental_transform: smoothStream(),
  });

  return result.toDataStreamResponse();
}
