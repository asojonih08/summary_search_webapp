import { streamText, smoothStream } from "ai";
import { Model } from "@/ai/models";
import { generateDiscussionsPrompt } from "@/lib/generateDiscussionsPrompt";

// Allow streaming responses up to 30 seconds
export const maxDuration = 45;

export async function POST(req: Request) {
  console.log("Called Chat Discussions API\n");
  const { searchQuery, bestCommentsFromRelevantPosts } = await req.json();

  const prompt = await generateDiscussionsPrompt(
    bestCommentsFromRelevantPosts,
    searchQuery
  );

  const result = streamText({
    model: Model.OPENAI.GPT_4O_MINI,
    prompt: prompt,
    experimental_transform: smoothStream(),
  });

  return result.toDataStreamResponse();
}
