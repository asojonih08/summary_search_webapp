import { RedditComment } from "@/actions/getRedditBestCommentsForPost";
import React from "react";
import { Lightbulb } from "lucide-react";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub-style Markdown (tables, lists, etc.)
import DiscussionCommentTooltip from "./DiscussionCommentTooltip";
import DiscussionsCommentsSkeleton from "./DiscussionsCommentsSkeleton";
import { redirect } from "next/navigation";

interface DiscussionsCommentsProps {
  bestCommentsForRelevantPosts?: { [key: string]: RedditComment[] };
  isLoadingBestComments: boolean;
}

export default function DiscussionsComments({
  bestCommentsForRelevantPosts,
  isLoadingBestComments,
}: DiscussionsCommentsProps) {
  let comments = [];
  let postTitles = [];
  if (bestCommentsForRelevantPosts) {
    for (const key of Object.keys(bestCommentsForRelevantPosts)) {
      let bestComments = bestCommentsForRelevantPosts[key];
      if (
        bestComments[0].score &&
        bestComments[0].score >= 15 &&
        bestComments[0].body !== "[removed]" &&
        bestComments[0].body !== "[deleted]"
      ) {
        postTitles.push(key.split("/").at(-2)?.split("_").join(" "));
        comments.push(bestComments[0]);
      }
    }
  }
  function handleCommentClick(link: string) {
    window.open(link, "_blank");
  }
  const decodeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent;
  };
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <span className="flex items-center gap-2">
        <Lightbulb className="dark:text-textMainDark h-[17px] w-[17px]" />
        <h4 className="font-medium text-lg dark:text-textMainDark">Insights</h4>
      </span>
      {!isLoadingBestComments ? (
        <div className="flex flex-col gap-3 px-1">
          {comments.map((comment, index) => {
            if (comment.body.split("\n").length > 3) {
              return (
                <DiscussionCommentTooltip key={index} comment={comment}>
                  <div
                    onClick={() => handleCommentClick(comment.link)}
                    className="text-pretty w-full md:w-auto h-auto flex flex-col gap-1.5 dark:hover:bg-offsetPlusDark dark:text-textMainDark border-[0.3px] border-borderMain/10 ring-[0.3px] dark:ring-borderMain/10 divide-[0.3px] dark:divide-borderMain/10 dark:bg-mainBackgroundDark rounded-lg p-2.5 transition-all duration-300 cursor-pointer"
                  >
                    <h5 className="text-[17.5px] dark:text-textMainDark">
                      {comment.postTitle}
                    </h5>
                    <div className="text-sm inline-block text-pretty break-words leading-normal prose dark:prose-invert prose-h1:text-xl prose-h2:text-lg prose-h3:text-[17px] prose-h4:text-[16.5px] prose-table:mb-12  prose-p:dark:text-textMainDark/80 prose-strong:dark:text-textMainDark prose-strong:underline prose-strong:underline-offset-2 prose-strong:decoration-textOffDark prose-li:list-outside prose-ol:space-y-6 prose-ol:my-4 dark:text-textMainDark">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {comment.body.split("\n").slice(0, 3).join("\n")}
                      </ReactMarkdown>
                    </div>
                    {comment.body.split("\n").length > 3 && (
                      <div className="text-sm text-pretty break-words leading-normal prose dark:prose-invert prose-h1:text-xl prose-h2:text-lg prose-h3:text-[17px] prose-h4:text-[16.5px] prose-table:mb-12 prose-p:dark:text-textMainDark/80 prose-strong:dark:text-textMainDark prose-strong:underline prose-strong:underline-offset-2 prose-strong:decoration-textOffDark prose-li:list-outside prose-ol:space-y-6 -mt-1.5 -my-1 prose-li:bg-gradient-to-b prose-li:from-white prose-li:via-textMainDark/50 prose-li:my-0 prose-li:to-transparent inline-block prose-li:text-transparent prose-li:bg-clip-text">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {comment.body.split("\n")[3]}
                        </ReactMarkdown>
                      </div>
                    )}
                    <div className="text-sm flex gap-1.5 items-center dark:text-textMainDark/75 mt-1">
                      <TbArrowBigUp className="w-5 h-5" />
                      <span className="h-full text-xs">{comment.score}</span>
                      <TbArrowBigDown className="w-5 h-5" />
                      <span className="dark:text-superDark/80 ml-2">
                        r/{comment.subreddit}
                      </span>
                    </div>
                  </div>
                </DiscussionCommentTooltip>
              );
            } else {
              return (
                <div
                  onClick={() => handleCommentClick(comment.link)}
                  key={index}
                  className="text-pretty w-full md:w-auto h-auto flex flex-col gap-1.5 dark:hover:bg-offsetPlusDark dark:text-textMainDark border-[0.3px] border-borderMain/10 ring-[0.3px] dark:ring-borderMain/10 divide-[0.3px] dark:divide-borderMain/10 dark:bg-mainBackgroundDark rounded-lg p-2.5 transition-all duration-300 cursor-pointer"
                >
                  <h5 className="text-[17.5px] dark:text-textMainDark">
                    {decodeHTML(comment.postTitle)}
                  </h5>
                  <div className="text-sm inline-block text-pretty break-words leading-normal prose dark:prose-invert prose-h1:text-xl prose-h2:text-lg prose-h3:text-[17px] prose-h4:text-[16.5px] prose-table:mb-12  prose-p:dark:text-textMainDark/80 prose-strong:dark:text-textMainDark prose-strong:underline prose-strong:underline-offset-2 prose-strong:decoration-textOffDark prose-li:list-outside prose-ol:space-y-6 prose-ol:my-4 dark:text-textMainDark">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {comment.body.split("\n").slice(0, 3).join("\n")}
                    </ReactMarkdown>
                  </div>
                  {comment.body.split("\n").length > 5 && (
                    <div className="text-sm text-pretty break-words leading-normal prose dark:prose-invert prose-h1:text-xl prose-h2:text-lg prose-h3:text-[17px] prose-h4:text-[16.5px] prose-table:mb-12 prose-p:dark:text-textMainDark/80 prose-strong:dark:text-textMainDark prose-strong:underline prose-strong:underline-offset-2 prose-strong:decoration-textOffDark prose-li:list-outside prose-ol:space-y-6 -mt-1.5 -my-1 prose-li:bg-gradient-to-b prose-li:from-white prose-li:via-textMainDark/50 prose-li:my-0 prose-li:to-transparent inline-block prose-li:text-transparent prose-li:bg-clip-text">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {comment.body.split("\n")[3]}
                      </ReactMarkdown>
                    </div>
                  )}

                  <div className="text-sm flex gap-1.5 items-center dark:text-textMainDark/75 mt-1">
                    <TbArrowBigUp className="w-5 h-5" />
                    <span className="h-full text-xs">{comment.score}</span>
                    <TbArrowBigDown className="w-5 h-5" />
                    <span className="dark:text-superDark/80 ml-2">
                      r/{comment.subreddit}
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <DiscussionsCommentsSkeleton />
      )}
    </div>
  );
}
