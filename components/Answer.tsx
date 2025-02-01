"use client";

import { useState, useEffect, useMemo, useTransition, Fragment } from "react";
import AnswerSkeleton from "./AnswerSkeleton";
import SourceCircleTooltip from "./SourceCircleTooltip";
import LoadingLogoIcon from "./LoadingLogoIcon";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub-style Markdown (tables, lists, etc.)
import { fetchChatStream } from "@/actions/fetchChatStream";
import { SearchResult } from "@/actions/getSearchResults";
import { useSearchParams } from "next/navigation";
import Markdown from "react-markdown";

interface AnswerProps {
  searchResults?: SearchResult[];
  isLoadingSearchResults: boolean;
}

export default function Answer({
  searchResults,
  isLoadingSearchResults,
}: AnswerProps) {
  const [answer, setAnswer] = useState(""); // state to accumulate streamed answer
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const handleSubmit = async (query: string) => {
    setAnswer(""); // Clear previous answer
    searchResults &&
      startTransition(async () => {
        // Streaming the answer chunk by chunk
        for await (const chunk of fetchChatStream(query, searchResults)) {
          // Append each chunk of the answer as it is received
          // console.log(chunk);
          setAnswer((prev) => prev + chunk);
          setIsLoading(false);
        }
        setIsStreaming(false);
      });
  };

  useEffect(() => {
    handleSubmit(searchQuery);
  }, [searchQuery, searchResults]);

  const answerTitle = useMemo(
    () => (
      <h4 className="font-medium text-lg dark:text-textMainDark">Answer</h4>
    ),
    []
  );

  // Function to render citations with SourceCircleTooltip
  const renderCitations = (text: string) => {
    const regex = /\[(\d+)\]/g; // Matches [1], [2], etc.
    const parts = text.split(regex);

    // Create a React fragment where we manually insert the SourceCircleTooltip for each citation
    return parts.map((part, index) => {
      // console.log("part: ", part);
      if (index % 2 === 1) {
        // This means it's a citation number (e.g., "1", "2")
        const num = parseInt(part, 10);
        const source =
          searchResults && searchResults[num - 1]
            ? searchResults[num - 1]
            : null;

        if (source) {
          // Return the SourceCircleTooltip component for citations
          return (
            <SourceCircleTooltip
              key={`source-${Math.random() + index}`}
              sourceNumber={num}
              title={source.title}
              snippet={source.snippet}
              displayLink={source.displayLink}
              link={source.link}
            />
          );
        }
        // If no source is found, return the citation number as normal text
        return `[${num}]`;
      }
      // If not a citation, just return the plain text
      if (!part.includes("###"))
        part = part.replaceAll("\n\n\n\n\n", "\n&nbsp;");
      // console.log(
      //   "part<",
      //   JSON.stringify(part),
      //   ">; Contains newline: ",
      //   part.includes("\n")
      // );
      return [
        <Markdown
          key={index}
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <span className="">{children}</span>,
          }}
        >
          {part}
        </Markdown>,
      ];
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <LoadingLogoIcon
          className="h-[22px] w-[22px] dark:text-textMainDark"
          isLoading={isStreaming}
        />
        {answerTitle}
      </div>
      <span className="dark:text-textMainDark text-justify">
        {isLoading ? (
          <AnswerSkeleton />
        ) : (
          <span className="text-pretty whitespace-pre-line">
            {/* Render citations with React components inside the answer */}
            {renderCitations(answer)}
          </span>
        )}
      </span>
    </div>
  );
}
