"use server";

export interface ImageResult {
  url: string;
  data?: string; // Base64 encoded image data
  error?: string; // Error message if fetching fails
}

export async function getSearchImages(
  imageLinks: string[]
): Promise<ImageResult[]> {
  if (!Array.isArray(imageLinks) || imageLinks.length === 0) {
    throw new Error("Invalid or empty imageLinks array");
  }

  const imagePromises = imageLinks.map(async (url): Promise<ImageResult> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${url}`);
      }
      const buffer = await response.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      const contentType = response.headers.get("content-type");
      return { url, data: `data:${contentType};base64,${base64Image}` };
    } catch (err) {
      return { url, error: (err as Error).message };
    }
  });

  return await Promise.all(imagePromises);
}
