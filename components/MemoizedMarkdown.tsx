import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub-style Markdown (tables, lists, etc.)

import SourceCircleTooltip from "@/components/SourceCircleTooltip";
import { SearchResult } from "@/actions/getSearchResults";

// Define props for Citation component
interface CitationProps {
  sourceNumber: number;
  searchResults: SearchResult[];
}

// Custom Citation Component
const Citation = ({ sourceNumber, searchResults }: CitationProps) => {
  return (
    // <span className="dark:text-textMainDark text-xs cursor-pointer hover:underline rounded-full h-6 w-6 p-2 mx-0.5 bg-offsetPlusDark inline-flex items-center justify-center">
    //   <span className="">{numbers}</span>
    // </span>
    <span className="inline-block relative">
      <SourceCircleTooltip
        sourceNumber={Number(sourceNumber)}
        link={searchResults[sourceNumber - 1].link ?? ""}
        displayLink={searchResults[sourceNumber - 1].displayLink ?? ""}
        snippet={searchResults[sourceNumber - 1].snippet ?? ""}
        title={searchResults[sourceNumber - 1].title ?? ""}
      />
    </span>
  );
};

// Function to process citations
function processCitations(markdown: string): string {
  return markdown.replace(/\[(\d+)\]/g, (_, numbers) => {
    return `CITATION_${numbers.replace(/\]\[/g, "_")}`; // Placeholder replacement
  });
}

// Parse Markdown into Blocks
function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  //   console.log("Tokens in parseMarkdownIntoBlocks:  ", tokens);
  return tokens.map((token) => processCitations(token.raw));
}

// Define props for MemoizedMarkdownBlock component
interface MemoizedMarkdownBlockProps {
  content: string;
  searchResults: SearchResult[];
}

// Memoized Markdown Block
const MemoizedMarkdownBlock = memo(
  ({ content, searchResults }: MemoizedMarkdownBlockProps) => {
    console.log("Content:  ", content);
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            // Flatten children to avoid wrapping inline elements inside <p>
            const content = Array.isArray(children)
              ? children.flat()
              : [children];

            return (
              <span className="whitespace-pre-line">
                {content.map((child) => {
                  if (typeof child === "string") {
                    const parts = child.split(/(CITATION_\d+)/g);
                    return parts.map((part, index) => {
                      if (part === ".") part = part.replace(".", ". ");
                      return part.startsWith("CITATION_") ? (
                        <span className="inline-block" key={index}>
                          <Citation
                            sourceNumber={Number(
                              part.replace("CITATION_", "").replace(/_/g, ", ")
                            )}
                            searchResults={searchResults}
                          />
                        </span>
                      ) : (
                        part
                      );
                    });
                  }
                  return child; // Keep existing React elements as-is
                })}
              </span>
            );
          },
          li: ({ children }) => {
            // console.log("Children: ", children, " \nTYPE: ", typeof children);

            // If children is a string, apply citation replacement
            if (typeof children === "string") {
              const parts = children.split(/(CITATION_\d+)/g);
              //   console.log("parts in ReactMarkdown 1: ", parts);
              return (
                <li>
                  {parts.map((part, index) => {
                    return part.startsWith("CITATION_") ? (
                      <span className="inline-block" key={index}>
                        <Citation
                          sourceNumber={Number(
                            part.replace("CITATION_", "").replace(/_/g, ", ")
                          )}
                          searchResults={searchResults}
                        />
                      </span>
                    ) : (
                      part
                    );
                  })}
                </li>
              );
            }

            // If children is an array, process each part
            if (Array.isArray(children)) {
              //   console.log("Children:  ", children);
              return (
                <li>
                  {children.map((child, index) => {
                    // If child is a string, apply citation replacement
                    if (typeof child === "string") {
                      const parts = child.split(/(CITATION_\d+)/g);
                      //   console.log("parts in ReactMarkdown 2: ", parts);
                      return parts.map((part, subIndex) =>
                        part.startsWith("CITATION_") ? (
                          <span
                            className="inline-block"
                            key={`${index}-${subIndex}`}
                          >
                            <Citation
                              sourceNumber={Number(
                                part
                                  .replace("CITATION_", "")
                                  .replace(/_/g, ", ")
                              )}
                              searchResults={searchResults}
                            />
                          </span>
                        ) : (
                          part
                        )
                      );
                    }
                    // If child is already a React element (e.g., <strong>), return as-is
                    return child;
                  })}
                </li>
              );
            }
            console.log(
              "Other children: ",
              children,
              "  TYPE: ",
              typeof children
            );
            return children;
          },
          strong: ({ children }) => {
            // Flatten children to avoid wrapping inline elements inside <p>
            const content = Array.isArray(children)
              ? children.flat()
              : [children];

            return (
              <strong>
                {content.map((child) => {
                  if (typeof child === "string") {
                    const parts = child.split(/(CITATION_\d+)/g);
                    return parts.map((part, index) => {
                      if (part === ".") part = part.replace(".", ". ");
                      return part.startsWith("CITATION_") ? (
                        <span className="inline-block" key={index}>
                          <Citation
                            sourceNumber={Number(
                              part.replace("CITATION_", "").replace(/_/g, ", ")
                            )}
                            searchResults={searchResults}
                          />
                        </span>
                      ) : (
                        part
                      );
                    });
                  }
                  return child; // Keep existing React elements as-is
                })}
              </strong>
            );
          },

          td: ({ children }) => {
            // Flatten children to avoid wrapping inline elements inside <p>
            const content = Array.isArray(children)
              ? children.flat()
              : [children];

            return (
              <td>
                {content.map((child) => {
                  if (typeof child === "string") {
                    const parts = child.split(/(CITATION_\d+)/g);
                    return parts.map((part, index) => {
                      if (part === ".") part = part.replace(".", ". ");
                      return part.startsWith("CITATION_") ? (
                        <span className="inline-block" key={index}>
                          <Citation
                            sourceNumber={Number(
                              part.replace("CITATION_", "").replace(/_/g, ", ")
                            )}
                            searchResults={searchResults}
                          />
                        </span>
                      ) : (
                        part
                      );
                    });
                  }
                  return child; // Keep existing React elements as-is
                })}
              </td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

// Define props for MemoizedMarkdown component
interface MemoizedMarkdownProps {
  content: string;
  id: string;
  searchResults: SearchResult[];
}

// Memoized Markdown Renderer
export const MemoizedMarkdown = memo(
  ({ content, id, searchResults }: MemoizedMarkdownProps) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return blocks.map((block, index) => (
      <div
        key={`${id}-block_${index}`}
        className="inline text-pretty break-words leading-normal prose prose-p:dark:text-textMainDark prose-strong:dark:text-textMainDark prose-strong:underline prose-strong:underline-offset-2 prose-strong:decoration-textOffDark prose-li:list-outside prose-ol:space-y-6 prose-ol:my-4 dark:text-textMainDark"
      >
        <MemoizedMarkdownBlock content={block} searchResults={searchResults} />
      </div>
    ));
  }
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
