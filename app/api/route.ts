import { NextRequest } from "next/server";
import { fetchChatStream } from "@/lib/fetchChatStream"; // Adjust the path as needed

export async function POST(req: NextRequest) {
  console.log("Called api route");
  const { searchQuery, searchResults } = await req.json();

  if (!searchQuery || !searchResults) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of fetchChatStream(searchQuery, searchResults)) {
          // console.log("chunk: ", chunk)
          controller.enqueue(new TextEncoder().encode(chunk));
        }
      } catch (error) {
        console.error("Streaming error:", error);
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "Transfer-Encoding": "chunked",
    },
  });
}
