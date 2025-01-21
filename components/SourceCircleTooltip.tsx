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
  image?: string;
  images?: [string];
  displayLink: string;
  link: string;
  snippet: string;
}

export default function SourceCircleTooltip({
  sourceNumber,
  title,
  image,
  images,
  displayLink,
  link,
  snippet,
}: SourceCircleTooltipProps) {
  const titleSplit = title.split(" ");
  const condesedDisplayLink = displayLink.split(".").at(-2);
  const faviconFromGoogle = `https://www.google.com/s2/favicons?domain=${displayLink}&sz=${128}`;
  const avatar = (
    <Avatar className="w-4 h-4">
      <AvatarImage src={faviconFromGoogle} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex justify-center items-center h-[17.5px] w-[17.5px] mr-[0.1rem] -ml-[0.05rem] relative -top-[3px] pt-0.5 pr-[0.08rem] dark:bg-offsetPlusDark rounded-full text-center">
            <span className="w-full h-full text-[10px] dark:text-textOffDark dark:hover:text-textMainDark cursor-pointer transition-colors duration-300">
              {sourceNumber}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="dark:bg-contentBackgroundDark dark:border-borderMain/50 shadow-lg rounded-lg  py-[14px] px-4 w-80 h-auto flex flex-col gap-1.5 text-left"
        >
          <div className="flex gap-1 items-center">
            {avatar}
            <span className="dark:text-textOffDark">{condesedDisplayLink}</span>
          </div>
          <a href={link} target={"_blank"}>
            <h3 className="text-sm font-medium h-full dark:hover:text-superDark transition-colors duration-150">
              {title}
            </h3>
          </a>
          <p className="text-sm h-full">{snippet}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
