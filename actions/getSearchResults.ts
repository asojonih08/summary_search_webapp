"use server";

export type SearchResult = {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: {
    cse_thumbnail?: { src: string; width: string; height: string }[];
    metatags?: Record<string, string>[];
    cse_image?: { src: string }[];
    organization?: { telephone?: string; url?: string }[];
    hcard?: { fn: string; nickname?: string; photo: string }[];
  };
};

export async function getSearchResults(
  searchQuery: string
): Promise<SearchResult[]> {
  if (searchQuery.length === 0) {
    throw new Error("Empty search query");
  }
  const api_key = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_SEARCH_ENGINE_ID;
  const url = `https://www.googleapis.com/customsearch/v1?$key=${api_key}&cx=${cx}&q=${searchQuery}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // console.log(data.items);

    return data.items;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
}
