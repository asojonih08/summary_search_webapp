"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { ListFilter } from "lucide-react";
import { TbWorld } from "react-icons/tb";
import DiscussionIcon from "./DiscussionIcon";
import { GoCommentDiscussion } from "react-icons/go";
import AiIcon from "./AiIcon";
import { title } from "process";
import AiSquareIcon from "./AiSquareIcon";
import { useSourceFocus } from "./SourceFocusContext";
const focusOptions = [
  {
    icon: <TbWorld />,
    title: "Web",
    subtitle: "Search across the entire internet",
  },
  {
    icon: <GoCommentDiscussion />,
    title: "Discussions",
    subtitle: "Insights and opinions",
  },
  {
    icon: <AiSquareIcon className="h-4 w-4" />,
    title: "Chat",
    subtitle: "Ask the chatbot directly",
  },
];

export default function FocusSelection() {
  const { sourceFocusSelection, setSourceFocusSelection } = useSourceFocus();
  const [focusSelectionOpen, setFocusSelectionOpen] = useState(false);
  const [focusTooltipOpen, setFocusTooltipOpen] = useState(false);
  return (
    <TooltipProvider delayDuration={300}>
      <Popover open={focusSelectionOpen} onOpenChange={setFocusSelectionOpen}>
        <Tooltip open={focusTooltipOpen} onOpenChange={setFocusTooltipOpen}>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                className="h-[32px] w-[32px] rounded-full flex gap-1 items-center dark:hover:text-textMainDark dark:hover:bg-offsetPlusDark"
              >
                {
                  focusOptions.filter(
                    (option) => option.title === sourceFocusSelection
                  )[0].icon
                }
              </Button>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="dark:bg-[#2D2F2F] dark:shadow-sm p-1.5 px-2 h-7 flex items-center justify-center">
            <p className="text-xs font-medium h-full">
              Set a focus for your sources
            </p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent
          align="start"
          className="shadow-md dark:bg-backgroundDark dark:border-borderMain/50 dark:ring-borderMain/50 dark:divide-borderMain/50 p-2 w-80"
        >
          <div className="flex flex-col gap-2.5">
            {focusOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  setSourceFocusSelection(option.title);
                }}
                className="flex gap-2.5 hover:dark:bg-offsetDark dark:text-textMainDark transition-all duration-300 cursor-pointer p-1.5 pl-3 rounded-[0.25rem]"
              >
                <div
                  className={`${
                    sourceFocusSelection === option.title
                      ? "dark:text-superDark"
                      : ""
                  }  mt-[3px]`}
                >
                  {option.icon}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`${
                      sourceFocusSelection === option.title
                        ? "dark:text-superDark"
                        : ""
                    } text=sm font-medium`}
                  >
                    {option.title}
                  </span>
                  <span className="text-xs dark:text-textOffDark">
                    {option.subtitle}
                  </span>
                </div>
              </div>
            ))}{" "}
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}
