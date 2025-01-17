"use client";
import React, { useRef, useState } from "react";
import SearchInput from "@/components/SearchInput";
import SearchCardActions from "@/components/SearchCardActions";
import axios from "axios";

// async function getGoogleSuggestions(query: string): Promise<string[]> {
//   if (query.length === 0) return Promise.resolve([]);

//   const response = await axios.get(
//     `https://suggestqueries.google.com/complete/search?client=chrome-omni&q=${query}`
//   );
//   const suggestions = await response.data;
//   return suggestions[1];
// }

export default function SearchCard() {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  // const suggestions = await getGoogleSuggestions("nodejs");
  // console.log(suggestions);
  return (
    <div>
      <div
        className={`${
          inputFocused
            ? "dark:border-borderMain rounded-t-md "
            : "dark:border-borderMain/50 rounded-md"
        } dark:bg-mainBackgroundDark border-[1.9px] transition-colors duration-200 shadow-sm w-[640px] h-[114px] flex flex-col pt-4 pb-0`}
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
      {searchInput.length > 0 && inputFocused && (
        <div
          className={`dark:border-borderMain dark:bg-mainBackgroundDark border-x-[1.9px] border-b-[1.9px] transition-colors duration-200 rounded-b-md shadow-sm w-[640px] h-[114px] flex flex-col pt-4 pb-0`}
        ></div>
      )}
    </div>
  );
}
