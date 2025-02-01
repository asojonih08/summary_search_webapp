import { SearchResult } from "./getSearchResults";

export async function* fetchChatStream(
  prompt: string,
  searchResults: SearchResult[]
) {
  const response = await fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search_query: prompt,
      search_results: searchResults,
    }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  let result = "";

  if (reader) {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      // Decode the chunk
      result += decoder.decode(value, { stream: true });
      // console.log("result: ", result);
      // Yield after each chunk is decoded and processed
      yield result;

      // Reset result for the next chunk to prevent concatenation
      result = "";
    }
  }
}
