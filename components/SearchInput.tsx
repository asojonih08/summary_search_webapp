import React, { Dispatch, RefObject, SetStateAction } from "react";
import { Textarea } from "@/components/ui/textarea";

interface SearchInputProps {
  setInputFocused: Dispatch<SetStateAction<boolean>>;
}

export default function SearchInput({ setInputFocused }: SearchInputProps) {
  return (
    <Textarea
      autoComplete="false"
      placeholder={"Ask anything..."}
      onFocus={() => setInputFocused(true)}
      onBlur={() => setInputFocused(false)}
      className="dark:text-textMainDark caret-caretColor p-0 placeholder:text-base dark:bg-mainBackgroundDark min-h-full [resize:none] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
    ></Textarea>
  );
}
