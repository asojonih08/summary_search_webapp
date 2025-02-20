import { RedditComment } from "@/actions/getRedditBestCommentsForPost";
import React from "react";
import { Lightbulb } from "lucide-react";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import { title } from "process";

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
        bestComments[0].score >= 20 &&
        bestComments[0].body !== "[removed]" &&
        bestComments[0].body !== "[deleted]"
      ) {
        postTitles.push(key.split("/").at(-2)?.split("_").join(" "));
        comments.push(bestComments[0]);
      }
    }
  }
  return comments.length > 0 ? (
    <div className="w-full h-full flex flex-col gap-3">
      <span className="flex items-center gap-2">
        <Lightbulb className="dark:text-textMainDark h-[17px] w-[17px]" />
        <h4 className="font-medium text-lg dark:text-textMainDark">Insights</h4>
      </span>
      {!isLoadingBestComments ? (
        <div className="flex flex-col gap-3 px-1">
          {comments.map((comment, index) => {
            function isAlphabetRegex(char: string) {
              return /^[a-zA-Z]$/.test(char);
            }
            let title = postTitles[index]
              ? isAlphabetRegex(postTitles[index][0])
                ? postTitles[index][0].toUpperCase() +
                  postTitles[index].substring(1)
                : postTitles[index]
              : "";
            return (
              <a
                key={index}
                className="text-pretty w-full md:w-auto h-auto flex flex-col gap-1 dark:hover:bg-offsetPlusDark dark:text-textMainDark border-[0.3px] border-borderMain/10 ring-[0.3px] dark:ring-borderMain/10 divide-[0.3px] dark:divide-borderMain/10 dark:bg-mainBackgroundDark rounded-lg p-2 transition-all duration-300 cursor-pointer"
              >
                <h5 className="text-[17.5px] dark:text-textMainDark">
                  {title}
                </h5>
                <div className="-mt-0.5 text-pretty text-sm line-clamp-4 dark:text-textMainDark/75">
                  {comment.body}
                </div>
                <div className="text-sm flex gap-1.5 items-center dark:text-textMainDark/75">
                  <TbArrowBigUp className="w-5 h-5" />
                  <span className="h-full text-xs">{comment.score}</span>
                  <TbArrowBigDown className="w-5 h-5" />
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  ) : null;
}
