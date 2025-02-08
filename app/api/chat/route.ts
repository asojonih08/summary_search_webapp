import { openai } from "@ai-sdk/openai";
import { streamText, smoothStream } from "ai";
import { summarizePromptBuilder } from "@/lib/summary";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  console.log("Called Chat 1 API");
  const { searchQuery, searchResultsItems } = await req.json();

  const prompt = await summarizePromptBuilder(searchQuery, searchResultsItems);
  //   console.log("Generated Prompt: ", prompt);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    prompt: prompt,
    experimental_transform: smoothStream(),
  });

  return result.toDataStreamResponse();
}
