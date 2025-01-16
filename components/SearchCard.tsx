"use client";
import React, { useRef, useState } from "react";
import SearchInput from "@/components/SearchInput";
import SearchCardActions from "@/components/SearchCardActions";

export default function SearchCard() {
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <div
      className={`${
        inputFocused ? "dark:border-borderMain" : "dark:border-borderMain/50"
      } dark:bg-mainBackgroundDark border-[1.9px] transition-colors duration-200 rounded-md shadow-sm w-[640px] h-[114px] flex flex-col pt-4 pb-0`}
    >
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
  );
}
