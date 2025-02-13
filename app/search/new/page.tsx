import CopyLinkButton from "@/components/CopyLinkButton";
import SearchQuery from "@/components/SearchQuery";
import SearchResults from "@/components/SearchResults";
import ShareButton from "@/components/ShareButton";
import TimeSinceSearch from "@/components/TimeSinceSearch";

import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full flex flex-col md:pb-0 pb-32">
        <div className="z-10 rounded-t-lg sticky left-0 right-0 top-0 border-b md:min-h-[53px] h-auto px-4 py-2 dark:bg-contentBackgroundDark dark:border-borderMain/50 dark:divide-borderMain/50 flex justify-between items-center">
          <TimeSinceSearch />
          <SearchQuery />
          <div className="flex items-center gap-2">
            <CopyLinkButton />
            <ShareButton />
          </div>
        </div>
        <div className="md:px-8 px-4 flex justify-center">
          <SearchResults />
        </div>
      </div>
    </Suspense>
  );
}
