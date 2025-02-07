"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function SearchQuery() {
  const searchParams = useSearchParams();
  const search_query = searchParams.get("q") || "";
  return (
    <div className="truncate text-xs font-medium dark:text-textMainDark">
      {search_query}
    </div>
  );
}
