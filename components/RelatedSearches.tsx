"use client";
import React from "react";
import { fetchSuggestions } from "@/actions/getSuggestions";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

export default function RelatedSearches() {
  const searchParams = useSearchParams();
  const search_query = searchParams.get("q") || "";
  const { data: suggestions, isLoading } = useQuery({
    queryKey: ["suggestions", search_query],
    queryFn: () => fetchSuggestions(search_query),
    enabled: !!search_query, // Fetch only when there's a query
  });
  return (
    <>
      {suggestions?.map((suggestion, index) => (
        <div key={index}>
          <Separator className="w-full h-[0.2px] mb-2 dark:bg-borderMain/50 " />
          <Link
            href={`/search/new?q=${suggestion}`}
            className="dark:text-textMainDark font-medium flex justify-between items-center w-full group cursor-pointer"
          >
            <span className="dark:group-hover:text-superDark duration-300 transition-colors">
              {suggestion}
            </span>
            <FaPlus className="w-4 h-4 dark:text-superDark" />
          </Link>
        </div>
      ))}
    </>
  );
}
