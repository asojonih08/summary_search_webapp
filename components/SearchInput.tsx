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
  suggestions?: string[];
  arrowEventTriggered: boolean;
  setArrowEventTriggered: Dispatch<SetStateAction<boolean>>;
}

export default function SearchInput({
  setInputFocused,
  searchInput,
  setSearchInput,
  suggestions,
  arrowEventTriggered,
  setArrowEventTriggered,
}: SearchInputProps) {
  const router = useRouter();

  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  useEffect(() => setSelectedSuggestionIndex(-1), [arrowEventTriggered]);

  function handleKeyEvent(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    console.log("Handle Key Event", e.key);
    // setArrowEventTriggered(false);

    // if (e.key === "ArrowDown" && suggestions?.length) {
    //   setArrowEventTriggered(true); // Stop API call
    //   e.preventDefault();
    //   console.log("Arrow Down");
    //   const newIndex =
    //     selectedSuggestionIndex === suggestions.length - 1
    //       ? 0
    //       : selectedSuggestionIndex + 1;
    //   setSelectedSuggestionIndex(newIndex);
    //   setSearchInput(suggestions[newIndex]);
    // }

    // if (e.key === "ArrowUp" && suggestions?.length) {
    //   setArrowEventTriggered(true); // Stop API call
    //   e.preventDefault();
    //   console.log("Arrow Up");
    //   if (selectedSuggestionIndex !== -1) {
    //     const newIndex =
    //       selectedSuggestionIndex === 0 ? 0 : selectedSuggestionIndex - 1;
    //     setSelectedSuggestionIndex(newIndex);
    //     setSearchInput(suggestions[newIndex]);
    //   }
    // }

    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/search/new?q=${searchInput}`);
    }
  }
  return (
    <Textarea
      autoComplete="false"
      placeholder={"Ask anything..."}
      onFocus={() => setInputFocused(true)}
      onKeyDown={handleKeyEvent}
      onBlur={() => {
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
