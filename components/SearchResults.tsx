"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { getSummary } from "@/actions/getSummary";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  console.log(search);
  const { data: summary, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: () => getSummary(search),
    enabled: !!search, // Fetch only when there's a query
  });
  console.log(summary);
  return (
    <div>
      <h2 className="text-lg dark:text-textMainDark mb-9">{search}</h2>
      <span className="dark:text-textMainDark text-justify ">
        {isLoading ? "Loading" : <Markdown>{summary}</Markdown>}
      </span>
    </div>
  );
}
