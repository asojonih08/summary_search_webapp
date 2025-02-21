import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";
import { RedditComment } from "@/actions/getRedditBestCommentsForPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub-style Markdown (tables, lists, etc.)
import { Button } from "./ui/button";

interface DiscussionCommentTooltipProps {
  children: React.ReactNode;
  comment?: RedditComment;
}

export default function DiscussionCommentTooltip({
  children,
  comment,
}: DiscussionCommentTooltipProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="dark:bg-contentBackgroundDark lg:w-[710px] md:w-[94%] md:mx-4 md:flex md:flex-col sm:w-[100%] xs:w-[78%] w-[70%] ml-2 dark:border-borderMain/50 shadow-lg rounded-lg  py-[14px] px-4 h-auto max-h-[480px]  gap-1.5 text-left"
        >
          <a
            target={"_blank"}
            href={comment ? comment.link : ""}
            className="text-pretty w-full h-full flex flex-col gap-1.5 dark:text-textMainDark border-[0.3px] border-borderMain/10 ring-[0.3px] dark:ring-borderMain/10 divide-[0.3px] dark:divide-borderMain/10 rounded-lg p-2.5 transition-all duration-300 cursor-pointer"
          >
            <h5 className="text-[17.5px] dark:text-textMainDark">
              {comment ? comment.postTitle : ""}
            </h5>
            <div className="text-sm inline-block text-pretty break-words leading-normal prose dark:prose-invert prose-h1:text-xl prose-h2:text-lg prose-h3:text-[17px] prose-h4:text-[16.5px] prose-table:mb-12  prose-p:dark:text-textMainDark/80 prose-strong:dark:text-textMainDark prose-strong:underline prose-strong:underline-offset-2 prose-strong:decoration-textOffDark prose-li:list-outside prose-ol:space-y-6 prose-ol:my-4 dark:text-textMainDark">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {comment ? comment.body.split("\n").slice(0, 9).join("\n") : ""}
              </ReactMarkdown>
            </div>
            {comment
              ? comment.body.split("\n").length > 9 && (
                  <div className="text-sm text-pretty break-words leading-normal prose dark:prose-invert prose-h1:text-xl prose-h2:text-lg prose-h3:text-[17px] prose-h4:text-[16.5px] prose-table:mb-12 prose-p:dark:text-textMainDark/80 prose-strong:dark:text-textMainDark prose-strong:underline prose-strong:underline-offset-2 prose-strong:decoration-textOffDark prose-li:list-outside prose-ol:space-y-6 -mt-1.5 -my-1 prose-li:bg-gradient-to-b prose-li:from-white prose-li:via-textMainDark/50 prose-li:my-0 prose-li:to-transparent inline-block prose-li:text-transparent prose-li:bg-clip-text">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {comment.body.split("\n")[9]}
                    </ReactMarkdown>
                  </div>
                )
              : null}

            <div className="text-sm flex gap-1.5 items-center justify-between dark:text-textMainDark/75 mt-1">
              <div className="flex items-center gap-1.5">
                <TbArrowBigUp className="w-5 h-5" />
                <span className="h-full text-xs">
                  {comment ? comment.score : ""}
                </span>
                <TbArrowBigDown className="w-5 h-5" />
                <span className="dark:text-superDark/80 ml-2">
                  r/{comment ? comment.subreddit : ""}
                </span>
              </div>
              {comment && comment.body.split("\n").length > 9 && (
                <Button
                  variant={"link"}
                  className="underline-offset-1 decoration-superDark transition-colors duration-1000 justify-self-end -mr-5 dark:text-textMainDark"
                >
                  view full comment
                </Button>
              )}
            </div>
          </a>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
