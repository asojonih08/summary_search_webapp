import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SourceCircleTooltipProps {
  sourceNumber: number;
  title: string;
  displayLink: string;
  link: string;
  snippet: string;
}

export default function SourceCircleTooltip({
  sourceNumber,
  title,
  displayLink,
  link,
  snippet,
}: SourceCircleTooltipProps) {
  const condesedDisplayLink = displayLink.split(".").at(-2);
  const faviconFromGoogle = `https://www.google.com/s2/favicons?domain=${displayLink}&sz=${128}`;
  const avatar = (
    <Avatar className="w-4 h-4 flex items-center justify-center">
      <AvatarImage src={faviconFromGoogle} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex justify-center items-center h-[17.5px] w-[17.5px] relative -top-[3px] mx-0.5 pt-0.5 pr-[0.08rem] dark:bg-offsetPlusDark rounded-full text-center">
            <span className="w-full h-full text-[10px] dark:text-textOffDark dark:hover:text-superDark/60 dark:hover:font-semibold cursor-pointer transition-colors duration-300">
              {sourceNumber}
            </span>
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="dark:bg-contentBackgroundDark dark:border-borderMain/50 shadow-lg rounded-lg  py-[14px] px-4 w-80 h-auto flex flex-col gap-1.5 text-left"
        >
          <span className="flex gap-1 items-center w-full">
            {avatar}
            <span className="dark:text-textOffDark">{condesedDisplayLink}</span>
          </span>
          <a href={link} target={"_blank"}>
            <span className="text-sm font-medium dark:text-textMainDark h-full dark:hover:text-superDark transition-colors duration-150">
              {title}
            </span>
          </a>
          <span className="text-sm h-full">{snippet}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
