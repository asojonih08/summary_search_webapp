"use client";
import React, { useRef, useState } from "react";
import SearchInput from "@/components/SearchInput";
import SearchCardActions from "@/components/SearchCardActions";
import { ArrowUpLeft } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fetchSuggestions } from "@/actions/getSuggestions";

export default function SearchCard() {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedQuery = useDebounce(searchInput, 300); // Debounce for 300ms
  // const suggestions = await getGoogleSuggestions("nodejs");
  // const suggestions = ["elon musk", "ebay", "3", "4"];
  // console.log(suggestions);
  const { data: suggestions, isLoading } = useQuery({
    queryKey: ["suggestions", debouncedQuery],
    queryFn: () => fetchSuggestions(debouncedQuery),
    enabled: !!debouncedQuery, // Fetch only when there's a query
  });

  return (
    <div>
      <div
        className={`${
          inputFocused
            ? "dark:border-borderMain/75 rounded-t-md ring-1 ring-borderMain"
            : "dark:border-borderMain/75 rounded-md"
        } dark:bg-mainBackgroundDark border-[1px] transition-colors duration-200 shadow-sm w-[640px] h-[114px] flex flex-col pt-4 pb-0`}
      >
        {/* <p>{suggestions}</p> */}
        <div className="basis-[42%] px-4">
          <SearchInput
            setInputFocused={setInputFocused}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
        <div className="basis-[58%] w-full px-2">
          <SearchCardActions searchInput={searchInput} />
        </div>
      </div>
      {searchInput.length > 0 &&
        inputFocused &&
        suggestions &&
        suggestions.length > 0 && (
          <div
            className={`dark:border-borderMain/75 ring-1 ring-borderMain dark:bg-mainBackgroundDark border-x-[1px] border-b-[1px] transition-colors duration-200 rounded-b-md shadow-sm w-[640px] h-auto flex flex-col px-2 pb-1.5`}
          >
            <ul>
              {suggestions &&
                suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className={`${
                      index === 0 ? "pt-2.5" : "pt-[18px]"
                    } dark:text-textMainDark/90 text-[14px] font-medium flex justify-between cursor-pointer`}
                  >
                    <span>{suggestion}</span>
                    <ArrowUpLeft className="dark:text-textOffDark/90 h-4 w-4" />
                  </li>
                ))}
            </ul>
          </div>
        )}
    </div>
  );
}
