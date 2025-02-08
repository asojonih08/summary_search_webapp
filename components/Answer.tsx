"use client";

import { useState, useEffect, useMemo } from "react";
import SourceCircleTooltip from "./SourceCircleTooltip";
import LoadingLogoIcon from "./LoadingLogoIcon";
import remarkGfm from "remark-gfm"; // Enables GitHub-style Markdown (tables, lists, etc.)
import { SearchResult } from "@/actions/getSearchResults";
import { useSearchParams } from "next/navigation";
import Markdown from "react-markdown";
import { useChat } from "ai/react";

interface AnswerProps {
  searchResults?: SearchResult[];
}

export default function Answer({ searchResults }: AnswerProps) {
  const [answer, setAnswer] = useState(""); // state to accumulate streamed answer
  const [isLoading, setIsLoading] = useState(true);
  const [isStreaming, setIsStreaming] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const chat1 = useChat({
    body: {
      searchQuery,
      searchResultsItems: searchResults,
    },
  });
  const chat2 = useChat({
    api: "/api/chatSpeed",
    body: {
      searchQuery,
      searchResultsItems: searchResults,
    },
  });

  useEffect(() => {
    const handleSubmitOld = async () => {
      setAnswer(""); // Clear previous answer
      setIsStreaming(true);

      try {
        const response = await fetch("/api", {
          method: "POST", // Use POST to send data in the body
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchQuery,
            searchResults, // Send the large data as part of the body
          }),
        });

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          setAnswer((prev) => prev + decoder.decode(value, { stream: true }));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error streaming response:", error);
      } finally {
        setIsStreaming(false);
      }
    };
    const hSubmit = async () =>
      chat1.handleSubmit(new Event("submit") as Event, {
        body: {
          searchQuery,
          searchResultsItems: searchResults,
        },
        allowEmptySubmit: true,
      });
    const hSubmit2 = async () =>
      chat2.handleSubmit(new Event("submit") as Event, {
        body: {
          searchQuery,
          searchResultsItems: searchResults,
        },
        allowEmptySubmit: true,
      });
    const handleSubmits = async () => {
      if (searchQuery && searchResults) {
        const [o, t, th] = await Promise.all([
          handleSubmitOld(),
          hSubmit(),
          hSubmit2(),
        ]);
        console.log(o, t, th);
      }
    };
    handleSubmits();
  }, [searchQuery, searchResults]);

  useEffect(() => setIsLoading(true), [searchQuery]);

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
      if (!part.includes("###")) part = part.replaceAll("\n", "\n&nbsp;&nbsp;");

      // if (part.match(/(\-\s)/g))
      //   part = part.replace("- ", "\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• ");
      // if (part.match(/(\d\.\s)/g)) {
      //   const num = parseFloat(part);
      //   part = part.replace(
      //     /(\d\.\s)/g,
      //     "&nbsp;&nbsp;&nbsp;&nbsp;" + part.match(/(\d\.\s)/g)
      //   );
      // }

      return [
        <Markdown
          key={index}
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <span>{children}</span>,
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
        {
          <div className="flex gap-3">
            <span className="text-pretty whitespace-pre-line w-full basis-1/3">
              <p className="dark:text-red-500 text-red-500 font-bold text-xl">
                Answer&nbsp;&nbsp;&nbsp;
              </p>
              {/* Render citations with React components inside the answer */}
              {!isLoading && renderCitations(answer)}
            </span>
            <div className="w-full basis-1/3">
              <p className="dark:text-red-500 text-red-500 font-bold text-xl">
                1&nbsp;&nbsp;&nbsp;
              </p>
              {chat1.messages.map((m) => (
                <div
                  key={m.id}
                  className="whitespace-pre-wrap text-textMainDark"
                >
                  {m.content}
                </div>
              ))}
            </div>
            <div className="w-full basis-1/3">
              <p className="dark:text-red-500 font-bold text-xl">
                2&nbsp;&nbsp;&nbsp;
              </p>
              {chat2.messages.map((m) => (
                <div
                  key={m.id}
                  className="whitespace-pre-wrap text-textMainDark"
                >
                  {m.content}
                </div>
              ))}
            </div>
          </div>
          // <ReactMarkdown
          //   components={{
          //     p: ({ children }) => (
          //       <span className="whitespace-pre-line">{children}</span>
          //     ),
          //     li: ({ children }) => (
          //       <li className="list-disc ml-7">{children}</li>
          //     ),
          //   }}
          //   remarkPlugins={[remarkGfm]}
          // >
          //   {answer.replaceAll("\n", "&nbsp; \n")}
          // </ReactMarkdown>
        }
      </span>
    </div>
  );
}
