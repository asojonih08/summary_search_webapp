import React from "react";
import { PiCirclesFourBold } from "react-icons/pi";
import SourceCard from "./SourceCard";
import SourceCardSkeleton from "./SourceCardSkeleton";

interface SourcesProps {
  summary?: { [key: string]: string };
  isLoading: boolean;
}

export default function Sources({ summary, isLoading }: SourcesProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2">
        <PiCirclesFourBold className="dark:text-textMainDark h-[17px] w-[17px] rotate-45" />
        <h4 className="font-medium text-lg dark:text-textMainDark">Sources</h4>
      </span>
      <div className="flex gap-2.5">
        {isLoading
          ? [0, 1, 2, 3].map((val, index) => <SourceCardSkeleton key={index} />)
          : summary && summary["search_results"]
          ? JSON.parse(summary.search_results)
              .items.slice(0, 4)
              .map((source: any, index: number) => (
                <SourceCard
                  variant={index === 3 ? "multiple sources" : "regular"}
                  key={index}
                  title={source.title}
                  image={""}
                  snippet={source.snippet}
                  source={source.displayLink} // Use the actual source data
                />
              ))
          : ""}
      </div>
    </div>
  );
}
