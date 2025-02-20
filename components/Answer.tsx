"use client";

import { useState, useEffect, useMemo } from "react";
import LoadingLogoIcon from "./LoadingLogoIcon";
import { SearchResult } from "@/actions/getSearchResults";
import { useSearchParams } from "next/navigation";
import { useChat } from "ai/react";
import AnswerSkeleton from "./AnswerSkeleton";
import { MemoizedMarkdown } from "./MemoizedMarkdown";
import { RedditComment } from "@/actions/getRedditBestCommentsForPost";

interface AnswerProps {
  searchResults?: SearchResult[];
  bestCommentsForRelevantPosts?: { [key: string]: RedditComment[] };
}

export default function Answer({
  searchResults,
  bestCommentsForRelevantPosts,
}: AnswerProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const sourceFocusSelection = searchParams.get("source-focus") || "";
  let api = "";
  switch (sourceFocusSelection) {
    case "Web":
      api = "/api/research";
      break;
    case "Discussions":
      api = "/api/discussions-research";
      break;
    case "Chat":
      api = "/api/chat";
      break;
    default:
      break;
  }

  const chat = useChat({
    api: api,
    onResponse: () => setIsStreaming(true),
    experimental_throttle: 50,
  });

  useEffect(() => {
    // const handleSubmitOld = async () => {
    //   setAnswer(""); // Clear previous answer
    //   setIsStreaming(true);

    // try {
    //     const response = await fetch("/api", {
    //       method: "POST", // Use POST to send data in the body
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         searchQuery,
    //         searchResults, // Send the large data as part of the body
    //       }),
    //     });

    //     if (!response.body) throw new Error("No response body");

    //     const reader = response.body.getReader();
    //     const decoder = new TextDecoder("utf-8");

    //     while (true) {
    //       const { done, value } = await reader.read();
    //       if (done) break;

    //       setAnswer((prev) => prev + decoder.decode(value, { stream: true }));
    //       setIsLoading(false);
    //     }
    //   } catch (error) {
    //     console.error("Error streaming response:", error);
    //   } finally {
    //     setIsStreaming(false);
    //   }
    // };
    const hSubmit = async () => {
      let body;
      switch (sourceFocusSelection) {
        case "Web":
          body = {
            searchQuery,
            searchResultsItems: searchResults,
          };
          break;
        case "Discussions":
          body = {
            searchQuery,
            bestCommentsForRelevantPosts,
          };
          break;
        case "Chat":
          body = {
            searchQuery,
          };
          break;
      }
      chat.handleSubmit(new Event("submit") as Event, {
        body: body,
        allowEmptySubmit: true,
      });
    };

    const handleSubmits = async () => {
      if (!searchQuery || !searchResults) return;
      if (
        sourceFocusSelection === "Discussions" &&
        !bestCommentsForRelevantPosts
      )
        return;
      hSubmit();
      setIsStreaming(false);
    };
    handleSubmits();
  }, [searchQuery, searchResults, bestCommentsForRelevantPosts]);

  const answerTitle = useMemo(
    () => (
      <h4 className="font-medium text-lg dark:text-textMainDark">Answer</h4>
    ),
    []
  );

  return (
    <div className="flex flex-col gap-3 md:mt-0 -mt-3.5">
      <div className="flex gap-2 items-center">
        <LoadingLogoIcon
          className="h-[22px] w-[22px] dark:text-textMainDark"
          isLoading={chat.isLoading}
        />
        {answerTitle}
      </div>
      <span className="dark:text-textMainDark text-justify">
        <div className="flex gap-3">
          {!isStreaming ? (
            <AnswerSkeleton />
          ) : (
            <div className="w-full">
              {chat.messages.map((m) => (
                <div key={m.id} className=" text-textMainDark">
                  <div className="inline text-pretty break-words leading-normal prose dark:prose-invert prose-h1:text-xl prose-h2:text-lg prose-h3:text-[17px] prose-h4:text-[16.5px] prose-table:mb-12 prose-p:dark:text-textMainDark prose-strong:dark:text-textMainDark prose-strong:underline prose-strong:underline-offset-2 prose-strong:decoration-textOffDark prose-li:list-outside prose-ol:space-y-6 prose-ol:my-4 dark:text-textMainDark">
                    <MemoizedMarkdown
                      id={m.id}
                      content={m.content}
                      searchResults={searchResults ?? []}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </span>
    </div>
  );
}
