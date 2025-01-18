"use server";

export async function fetchSuggestions(query: string): Promise<string[]> {
  if (query.length === 0) return Promise.resolve([]);

  const response = await fetch(
    `https://suggestqueries.google.com/complete/search?client=chrome-omni&q=${query}`
  );
  const suggestions = await response.json();
  console.log(suggestions[1]);
  return suggestions[1] ?? [];
}
