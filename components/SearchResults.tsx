"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Answer from "./Answer";
import Sources from "./Sources";
import { Separator } from "@/components/ui/separator";
import SummaryActions from "./SummaryActions";
import Related from "./Related";
import { getSummary } from "@/actions/getSummary";
import { useQuery } from "@tanstack/react-query";
import { useSourcesOpen } from "./SourcesOpenContext";
import AllSourcesList from "./AllSourcesList";
import SearchImages from "./SearchImages";

export default function SearchResults() {
  const { sourcesOpen } = useSourcesOpen();
  const searchParams = useSearchParams();
  const search_query = searchParams.get("q") || "";
  const { data: summary, isLoading } = useQuery({
    queryKey: ["summary", search_query],
    queryFn: () => getSummary(search_query),
    enabled: !!search_query, // Fetch only when there's a query
  });
  console.log(summary?.answer);
  console.log(search_query);
  console.log("isLoading in Search Results: ", isLoading);

  return (
    <div className="flex gap-14">
      <div className="basis-[60%]">
        <h2 className="text-3xl dark:text-textMainDark mb-9">{search_query}</h2>
        <div className="flex flex-col gap-7">
          <Sources summary={summary} isLoading={isLoading} />
          <Answer summary={summary} isLoading={isLoading} />
        </div>
        <SummaryActions />
        <Separator className="w-full h-[0.2px] mt-9 mb-8 dark:bg-borderMain/50 " />
        <Related />
      </div>
      <div className="basis-[40%]">
        {!sourcesOpen && !isLoading && (
          <SearchImages searchQuery={search_query} summary={summary} />
        )}
        {sourcesOpen && <AllSourcesList summary={summary} />}
      </div>
    </div>
  );
}
