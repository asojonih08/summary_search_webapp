import { openai } from "@ai-sdk/openai";
import { streamText, smoothStream } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

import {
  LambdaClient,
  InvokeCommandInput,
  InvokeCommand,
} from "@aws-sdk/client-lambda";

// Initialize the Lambda client
const lambda = new LambdaClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(req: Request) {
  console.log("Called Chat 2 Speed API");
  const { searchQuery, searchResultsItems } = await req.json();
  const input: InvokeCommandInput = {
    FunctionName: process.env.SCRAPER_LAMBDA_FUNCTION_NAME,
    InvocationType: "RequestResponse" as const,
    LogType: "None",
    Payload: new TextEncoder().encode(
      JSON.stringify({ searchQuery, searchResultsItems })
    ),
  };

  const command = new InvokeCommand(input);
  const response = await lambda.send(command);
  const uint8Array = response.Payload as Uint8Array;

  // Decode Uint8Array to string
  const decodedString = new TextDecoder("utf-8").decode(uint8Array);

  // Parse JSON if applicable
  const decodedPayload = JSON.parse(decodedString);
  //   console.log("Generated Prompt: ", decodedPayload);
  const result = streamText({
    model: openai("gpt-4o-mini"),
    prompt: decodedPayload,
    experimental_transform: smoothStream(),
  });

  return result.toDataStreamResponse();
}
