"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Sources from "./Sources";
import { Separator } from "@/components/ui/separator";
import SummaryActions from "./SummaryActions";
import Related from "./Related";
import { useQuery } from "@tanstack/react-query";
import { useSourcesOpen } from "./SourcesOpenContext";
import AllSourcesList from "./AllSourcesList";
import SearchImages from "./SearchImages";
import SearchVideos from "./SearchVideos";
import { getSearchResults } from "@/actions/getSearchResults";
import Answer from "./Answer";

export default function SearchResults() {
  const { sourcesOpen } = useSourcesOpen();
  const searchParams = useSearchParams();
  const search_query = searchParams.get("q") || "";
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchResults", search_query],
    queryFn: () => getSearchResults(search_query),
    enabled: !!search_query, // Fetch only when there's a query
  });
  console.log("Search Results:  ", searchResults);
  console.log("Search Query:  ", search_query);
  console.log("isLoading in Search Results: ", isLoading);

  return (
    <div className="grid-cols-12 md:grid gap-12 w-full max-w-[1100px] h-full flex justify-center">
      <div className="col-span-8">
        <h2 className="text-3xl dark:text-textMainDark my-8">{search_query}</h2>
        <div className="flex flex-col gap-7">
          <Sources searchResults={searchResults} isLoading={isLoading} />
          <Answer searchResults={searchResults} />
        </div>
        <SummaryActions />
        <Separator className="w-full h-[0.2px] mt-9 mb-8 dark:bg-borderMain/50" />
        <Related />
      </div>
      <div className="col-span-4 isolate">
        {!sourcesOpen && !isLoading && (
          <div className="flex flex-col gap-3 -mx-4 px-4 mt-8">
            <SearchImages
              searchQuery={search_query}
              searchResults={searchResults}
            />
            <SearchVideos searchQuery={search_query} />
          </div>
        )}
        {sourcesOpen && <AllSourcesList searchResults={searchResults} />}
      </div>
    </div>
  );
}
