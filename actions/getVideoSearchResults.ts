"use server";

type YouTubeSearchItem = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

type YouTubeSearchResponseItems = YouTubeSearchItem[] | null;

export async function getVideoSearchResults(
  query: string
): Promise<YouTubeSearchResponseItems> {
  if (query.length === 0) {
    return null;
  }
  const api_key = process.env.GOOGLE_API_KEY;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&videoSyndicated=true&q=${query}&key=${api_key}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    let videoSearchResults: YouTubeSearchResponseItems = [];
    if (data) {
      videoSearchResults = data.items;
      console.log(videoSearchResults);
    }
    return videoSearchResults;

    // Ensure the `response` field is handled correctly
  } catch (error) {
    console.error("Error fetching summary:", error);
    return null;
  }
}
