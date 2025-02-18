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
import HorizontalSearchImages from "./HorizontalSearchImages";
import { getBestCommentsForRelevantPosts } from "@/actions/getBestCommentsForRelevantPosts";

export default function SearchResults() {
  const { sourcesOpen } = useSourcesOpen();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const sourceFocusSelection = searchParams.get("source-focus") || "";
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["searchResults", searchQuery],
    queryFn: () =>
      getSearchResults(
        searchQuery + (sourceFocusSelection === "Discussions" ? " reddit" : "")
      ),
    enabled: !!searchQuery && sourceFocusSelection.length > 0, // Fetch only when there's a query
  });
  const {
    data: bestCommentsForRelevantPosts,
    isLoading: isLoadingBestComments,
  } = useQuery({
    queryKey: ["bestCommentsForRelevantPosts", searchQuery],
    queryFn: () =>
      getBestCommentsForRelevantPosts(
        searchResults?.filter((result) => result.link.includes("reddit.com")) ??
          []
      ),
    enabled: !!searchResults && searchResults.length > 0, // Fetch only when there are search results
  });
  console.log("Search Results:  ", searchResults);
  console.log("Search Query:  ", searchQuery);
  console.log("Source Focus Selection: ", sourceFocusSelection);
  console.log("isLoading in Search Results: ", isLoading);
  console.log("Best Comments: ", bestCommentsForRelevantPosts);

  return (
    <div className="grid-cols-12 md:grid gap-12 w-full max-w-[1100px] h-full">
      <div className="col-span-8 will-change-auto">
        <h2 className="text-3xl dark:text-textMainDark my-8">{searchQuery}</h2>
        <div className="flex flex-col gap-7 overflow-auto">
          {sourceFocusSelection !== "Chat" && (
            <Sources searchResults={searchResults} isLoading={isLoading} />
          )}
          <div className="md:hidden md:flex-none flex w-full items-center justify-center -mb-1">
            <HorizontalSearchImages
              searchQuery={searchQuery}
              searchResults={searchResults}
            />
          </div>
          {/* {bestCommentsForRelevantPosts &&
            Object.keys(bestCommentsForRelevantPosts)
              .slice(0, 4)
              .map((key, index) => (
                <div key={index} className="dark:text-textMainDark">
                  {bestCommentsForRelevantPosts[key][0].body}
                </div>
              ))} */}
          {sourceFocusSelection === "Web" || sourceFocusSelection === "Chat" ? (
            <Answer searchResults={searchResults} />
          ) : !isLoadingBestComments ? (
            <Answer
              searchResults={searchResults}
              bestCommentsFromRelevantPosts={bestCommentsForRelevantPosts}
            />
          ) : null}
        </div>
        <SummaryActions />
        <Separator className="w-full h-[0.2px] mt-9 mb-8 dark:bg-borderMain/50" />
        <Related />
      </div>
      <div className="col-span-4 isolate">
        {!sourcesOpen && !isLoading && (
          <div className="md:flex flex-col gap-3 -mx-4 px-4 mt-8 min-w-0 hidden">
            <SearchImages
              searchQuery={searchQuery}
              searchResults={searchResults}
            />
            <SearchVideos searchQuery={searchQuery} />
          </div>
        )}
        {sourcesOpen && sourceFocusSelection !== "Chat" && (
          <AllSourcesList searchResults={searchResults} />
        )}
      </div>
    </div>
  );
}
