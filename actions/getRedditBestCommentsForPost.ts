"use server";
import { extractPostId } from "@/lib/extractPostId";
import { getRedditAccessToken } from "@/lib/getRedditAccessToken";

export async function getRedditBestCommentsForPost(
  postUrl: string,
  commentsAmount: number
) {
  if (!postUrl) throw new Error("Post url is required.");
  try {
    const accessToken = await getRedditAccessToken();
    console.log("Access Token: ", accessToken);
    const postId = extractPostId(postUrl);
    if (!postId) throw new Error("Unable to extract post id");

    const response = await fetch(
      `https://oauth.reddit.com/comments/${postId}?sort=best&limit=${commentsAmount}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "web:nextjs-reddit-comments:v1.0 (by /u/asojonih)",
        },
      }
    );

    if (!response.ok) throw new Error("Gailed to fetch Reddit comments");
    const data = await response.json();
    const commentsList = data[1].data.children.map((comment: any) => ({
      author: comment.data.author,
      body: comment.data.body,
      score: comment.data.score,
    }));

    console.log("Extracted Comments:", commentsList);
    return commentsList;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}
