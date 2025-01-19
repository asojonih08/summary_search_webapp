import { getSummary } from "@/actions/getSummary";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import Markdown from "react-markdown";

export default function Answer() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const { data: summary, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: () => getSummary(search),
    enabled: !!search, // Fetch only when there's a query
  });
  console.log(summary);
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-medium text-lg dark:text-textMainDark">Answer</h4>
      <span className="dark:text-textMainDark text-justify ">
        {isLoading ? (
          "Loading"
        ) : (
          <span className="whitespace-pre-line text-base">
            <Markdown>{summary}</Markdown>
          </span>
        )}
      </span>
    </div>
  );
}
