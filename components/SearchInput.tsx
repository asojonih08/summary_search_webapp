import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  setInputFocused: Dispatch<SetStateAction<boolean>>;
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  displaySuggestions: string[];
  arrowEventTriggered: boolean;
  setArrowEventTriggered: Dispatch<SetStateAction<boolean>>;
  selectedSuggestionIndex: number;
  setSelectedSuggestionIndex: Dispatch<SetStateAction<number>>;
}

export default function SearchInput({
  setInputFocused,
  searchInput,
  setSearchInput,
  displaySuggestions,
  arrowEventTriggered,
  setArrowEventTriggered,
  selectedSuggestionIndex,
  setSelectedSuggestionIndex,
}: SearchInputProps) {
  const router = useRouter();

  function handleKeyEvent(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // console.log("Handle Key Event", e.key);
    setArrowEventTriggered(false);

    if (e.key === "ArrowDown") {
      setArrowEventTriggered(true); // Stop API call
      e.preventDefault();
      // console.log("Arrow Down");

      selectedSuggestionIndex < 0
        ? setSelectedSuggestionIndex(0)
        : selectedSuggestionIndex === displaySuggestions.length - 1
        ? setSelectedSuggestionIndex(0)
        : setSelectedSuggestionIndex((oldIndex) => oldIndex + 1);
    }

    if (e.key === "ArrowUp") {
      setArrowEventTriggered(true); // Stop API call
      e.preventDefault();
      // console.log("Arrow Up");
      selectedSuggestionIndex > 0
        ? setSelectedSuggestionIndex((oldIndex) => oldIndex - 1)
        : selectedSuggestionIndex === 0
        ? setSelectedSuggestionIndex(displaySuggestions.length - 1)
        : setSelectedSuggestionIndex(-1);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedSuggestionIndex !== -1)
        setSearchInput(displaySuggestions[selectedSuggestionIndex]);
      selectedSuggestionIndex === -1
        ? router.push(`/search/new?q=${searchInput}`)
        : router.push(
            `/search/new?q=${displaySuggestions[selectedSuggestionIndex]}`
          );
    }
  }
  return (
    <Textarea
      onClick={() => setSelectedSuggestionIndex(-1)}
      autoComplete="false"
      placeholder={"Ask anything..."}
      onFocus={() => {
        setInputFocused(true);
      }}
      onKeyDown={handleKeyEvent}
      onBlur={() => {
        setSelectedSuggestionIndex(-1);
        setTimeout(() => {
          setInputFocused(false);
        }, 200);
      }}
      value={searchInput}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
        setSearchInput(e.target.value);
      }}
      className="dark:text-textMainDark caret-caretColor p-0 placeholder:text-base text-base dark:bg-mainBackgroundDark min-h-full [resize:none] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
    ></Textarea>
  );
}
