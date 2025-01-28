"use client";
import CopyLinkButton from "@/components/CopyLinkButton";
import SearchResults from "@/components/SearchResults";
import ShareButton from "@/components/ShareButton";
import TimeSinceSearch from "@/components/TimeSinceSearch";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

export default function page() {
  const searchParams = useSearchParams();
  const search_query = searchParams.get("q") || "";
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full flex flex-col">
        <div className="z-10 rounded-t-lg sticky left-0 right-0 top-0 border-b md:min-h-[53px] h-auto px-4 py-2 dark:bg-contentBackgroundDark dark:border-borderMain/50 dark:divide-borderMain/50 flex justify-between items-center">
          <TimeSinceSearch />
          <div className="truncate text-xs font-medium dark:text-textMainDark">
            {search_query}
          </div>
          <div className="flex items-center gap-2">
            <CopyLinkButton />
            <ShareButton />
          </div>
        </div>
        <div className="px-8 flex justify-center">
          <SearchResults />
        </div>
      </div>
    </Suspense>
  );
}
