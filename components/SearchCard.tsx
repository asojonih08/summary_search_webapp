"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import SearchCardActions from "@/components/SearchCardActions";
import { ArrowUpLeft } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fetchSuggestions } from "@/actions/getSuggestions";
import { useRouter } from "next/navigation";
import { useSourceFocus } from "./SourceFocusContext";

export default function SearchCard() {
  const { sourceFocusSelection } = useSourceFocus();
  const router = useRouter();
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [displaySuggestions, setDisplaySuggestions] = useState<string[]>([]);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [arrowEventTriggered, setArrowEventTriggered] = useState(false);
  const debouncedQuery = useDebounce(searchInput, 300); // Debounce for 300ms
  const { data: suggestions } = useQuery({
    queryKey: ["suggestions", debouncedQuery],
    queryFn: () => fetchSuggestions(debouncedQuery),
    enabled: !!debouncedQuery && !arrowEventTriggered, // Fetch only when there's a query
  });

  // useEffect(() => {
  //   const fetchComments = async () =>
  //     getRedditBestCommentsForPost(
  //       "https://www.reddit.com/r/Coffee/comments/ygj3gt/wanted_quality_grinder_at_relatively_affordable/",
  //       5
  //     );
  //   console.log(fetchComments());
  // }, []);

  useEffect(() => {
    const newSuggestions = suggestions ? suggestions : [];

    if (suggestions) setDisplaySuggestions(newSuggestions);
  }, [suggestions]);

  useEffect(() => {
    if (searchInput.length === 0) setSelectedSuggestionIndex(-1);
  }, [searchInput]);

  // console.log(suggestions);
  const handleClick = async (suggestion: string) => {
    console.log("Search query pressed: ", suggestion);
    setSearchInput(suggestion);
    // Temporarily remove router.push to see if click event works
    router.push(
      `/search/new?q=${suggestion}&source-focus=${sourceFocusSelection}`
    );
  };
  return (
    <div className="h-full w-full flex flex-col items-center sm:px-2 md:px-8">
      <h3
        className={`mb-10 dark:text-textMainDark md:text-4xl text-3xl px-4 md:place-self-center place-self-start`}
      >
        What do you want to know?
      </h3>
      <div
        className={`${
          inputFocused
            ? "dark:border-borderMain/75 rounded-t-md ring-1 ring-borderMain"
            : "dark:border-borderMain/75 rounded-md"
        } ${
          suggestions ? "" : "rounded-md"
        } dark:bg-mainBackgroundDark border-[1px] transition-all duration-200 shadow-sm w-full h-[114px] max-w-[640px] flex flex-col pt-4 pb-0`}
      >
        <div className="basis-[42%] px-4">
          <SearchInput
            displaySuggestions={displaySuggestions}
            setArrowEventTriggered={setArrowEventTriggered}
            setInputFocused={setInputFocused}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            selectedSuggestionIndex={selectedSuggestionIndex}
            setSelectedSuggestionIndex={setSelectedSuggestionIndex}
          />
        </div>
        <div className="basis-[58%] w-full px-2">
          <SearchCardActions searchInput={searchInput} />
        </div>
      </div>
      {searchInput.length > 0 &&
        inputFocused &&
        displaySuggestions.length > 0 && (
          <div
            className={`dark:border-borderMain/75 ring-1 ring-borderMain dark:bg-mainBackgroundDark border-x-[1px] border-b-[1px] transition-colors duration-200 rounded-b-md shadow-sm max-w-[640px] w-full h-auto flex flex-col  py-1.5`}
          >
            {displaySuggestions.map((suggestion, index) => (
              <div
                onClick={() => handleClick(suggestion)}
                onMouseOver={() => setSelectedSuggestionIndex(index)}
                onMouseLeave={() => setSelectedSuggestionIndex(-1)}
                key={index}
                className={`${
                  selectedSuggestionIndex === index ? "bg-offsetPlusDark" : ""
                } w-full px-2 transition-all duration-200`}
              >
                <div
                  className={`${
                    index === 0
                      ? "md:pt-3 md:pb-2.5 pt-1.5 pb-1"
                      : "md:pt-4 md:pb-2.5 pt-2.5 pb-1"
                  } dark:text-textMainDark/90 text-[14px] md:font-medium cursor-pointer h-full  flex justify-between items-center`}
                >
                  <span>{suggestion}</span>
                  <ArrowUpLeft className="dark:text-textOffDark/90 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
