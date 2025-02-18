"use server";
import { getRedditAccessToken } from "@/lib/getRedditAccessToken";
import {
  getRedditBestCommentsForPost,
  RedditComment,
} from "./getRedditBestCommentsForPost";
import { SearchResult } from "./getSearchResults";

export async function getBestCommentsForRelevantPosts(
  redditSearchResults: SearchResult[]
) {
  const accessToken = await getRedditAccessToken();
  let bestCommentsInPosts: { [key: string]: RedditComment[] } = {};

  for (const result of redditSearchResults) {
    bestCommentsInPosts[result.link] = await getRedditBestCommentsForPost(
      accessToken,
      result.link,
      8
    );
  }
  // console.log("Best Comments Retrieved: ", bestCommentsInPosts);
  return bestCommentsInPosts;
}
