import React from "react";
import { PiCirclesFourBold } from "react-icons/pi";
import SourceCard from "./SourceCard";
import SourceCardSkeleton from "./SourceCardSkeleton";
import { SearchResult } from "@/actions/getSearchResults";

interface SourcesProps {
  searchResults?: SearchResult[];
  isLoading: boolean;
}

export default function Sources({ searchResults, isLoading }: SourcesProps) {
  console.log("isLoading in Sources: ", isLoading);
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2">
        <PiCirclesFourBold className="dark:text-textMainDark h-[17px] w-[17px] rotate-45" />
        <h4 className="font-medium text-lg dark:text-textMainDark">Sources</h4>
      </span>
      <div className="flex gap-2.5">
        {isLoading
          ? [0, 1, 2, 3].map((val, index) => <SourceCardSkeleton key={index} />)
          : searchResults
          ? searchResults
              .slice(0, 4)
              .map((searchResult: SearchResult, index: number) => (
                <SourceCard
                  variant={index === 3 ? "multiple sources" : "regular"}
                  key={
                    Date.now() +
                    "-" +
                    Math.random().toString(36).substring(2, 9)
                  }
                  title={searchResult.title}
                  snippet={searchResult.snippet}
                  displayLink={searchResult.displayLink} // Use the actual source data
                  link={searchResult.link}
                  images={
                    index === 3
                      ? searchResults
                          .slice(4, 9)
                          .map((searchResult: SearchResult) => {
                            return searchResult.displayLink ?? "";
                          })
                      : []
                  }
                />
              ))
          : ""}
      </div>
    </div>
  );
}
