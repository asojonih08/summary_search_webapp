import React, { ChangeEvent, Dispatch, RefObject, SetStateAction } from "react";
import { Textarea } from "@/components/ui/textarea";

interface SearchInputProps {
  setInputFocused: Dispatch<SetStateAction<boolean>>;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

export default function SearchInput({
  setInputFocused,
  searchInput,
  setSearchInput,
}: SearchInputProps) {
  return (
    <Textarea
      autoComplete="false"
      placeholder={"Ask anything..."}
      onFocus={() => setInputFocused(true)}
      onBlur={() => setInputFocused(false)}
      value={searchInput}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
        setSearchInput(e.target.value);
      }}
      className="dark:text-textMainDark caret-caretColor p-0 placeholder:text-base text-base dark:bg-mainBackgroundDark min-h-full [resize:none] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
    ></Textarea>
  );
}
