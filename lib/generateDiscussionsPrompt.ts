"use server";
import { RedditComment } from "@/actions/getRedditBestCommentsForPost";

export async function generateDiscussionsPrompt(
  bestCommentsInPosts: { [key: string]: RedditComment[] },
  searchQuery: string
) {
  let prompt = `
    I have compiled the best comments of Reddit posts from the most relevant results that a Google search for the query "${searchQuery}" returned.
    Using the provided sources, construct a concise response of around 200 - 300 words that is highly relevant to the search query.

    The summary should:
    1. Clearly represent the main ideas and insights from the sources without unnecessary repetition.
    2. Attribute information to its respective source by including the source number (e.g., [1], [2], [3]) immediately after the relevant part of the summary.
    3. Integrate information smoothly from multiple sources when possible while maintaining logical flow and coherence.
    4. Utilize markdown to cleanly format your output.
    5. Present a brief introduction. Then, key points or insights when appropriate in bullet or numbered format, and finally a conlusion that summarizes.
    6. Bold key subject matter and potential areas that may need expanded information.
    7. After the introduction, use markdown h2 headers to organize the summary into sections.
    8. Avoid using words like "conclusion" and "introduction".
    9. Use tables to present information, when appropriate.
    10. The summary should sound professional and journalistic, not too casual or vague.

    Here are the sources with each source labeled and numbered for reference:

    `;
  // console.log("Best Comments in Posts: ", bestCommentsInPosts);
  if (bestCommentsInPosts && Object.keys(bestCommentsInPosts).length > 0) {
    // console.log(
    //   "Authors: ",
    //   Object.keys(bestCommentsInPosts).map(
    //     (key) => bestCommentsInPosts[key][0].author
    //   )
    // );
    let index = 1;
    for (const key of Object.keys(bestCommentsInPosts)) {
      if (
        bestCommentsInPosts[key][0].score &&
        bestCommentsInPosts[key][0].score >= 5
      ) {
        prompt += `\n\n[${index}]:\n\nPost Title: ${key
          .split("/")
          .at(-2)
          ?.split("_")
          .join(" ")}\n`;
        for (const comment of bestCommentsInPosts[key]) {
          if (
            comment.body &&
            comment.body !== "[deleted]" &&
            comment.body.length > 0 &&
            comment.score >= 5
          ) {
            prompt += "Author: " + comment.author + "\n";
            prompt += "Comment Score: " + comment.score.toString() + "\n";
            prompt += "Comment:\n" + comment.body;
          }
        }
      }
      index++;
    }
    prompt +=
      "Please generate the summary in accordance with these instructions. In your response do not include any reference to this prompt.";
  }
  // console.log(
  //   "Discussions Prompt: \n",
  //   prompt,
  //   "\nPrompt length: ",
  //   prompt.split(" ").length
  // );
  return prompt;
}
