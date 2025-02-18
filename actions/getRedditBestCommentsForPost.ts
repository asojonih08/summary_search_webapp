"use server";
import { extractPostId } from "@/lib/extractPostId";

export type RedditComment = {
  author: string;
  id: string;
  body: string;
  score: number;
  link: string;
};

export async function getRedditBestCommentsForPost(
  accessToken: string,
  postUrl: string,
  commentsAmount: number
) {
  if (!postUrl) throw new Error("Post url is required.");
  try {
    // console.log("Access Token: ", accessToken);
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

    if (!response.ok) throw new Error("Failed to fetch Reddit comments");
    const data = await response.json();
    // console.log("Best Comments: ", data[1].data.children);
    const commentsList = data[1].data.children.map((comment: any) => ({
      author: comment.data.author,
      id: comment.data.id,
      body: comment.data.body,
      score: comment.data.score,
      link: "https://reddit.com" + comment.data.permalink,
    }));

    // console.log("Extracted Comments:", commentsList);
    return commentsList;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}
