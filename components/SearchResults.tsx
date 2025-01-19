"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Answer from "./Answer";
import Sources from "./Sources";
import { Separator } from "@/components/ui/separator";
import SummaryActions from "./SummaryActions";

function formatSummary(summary: string) {
  return summary.replaceAll("\n", "\n");
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const search_query = searchParams.get("q") || "";
  console.log(search_query);

  return (
    <div className="flex gap-7">
      <div className="basis-[60%]">
        <h2 className="text-3xl dark:text-textMainDark mb-9">{search_query}</h2>
        <div className="flex flex-col gap-7">
          <Sources />
          <Answer />
        </div>
        <SummaryActions />
        <Separator className="w-full h-[0.2px] my-10 dark:bg-borderMain/50 " />
      </div>
    </div>
  );
}
