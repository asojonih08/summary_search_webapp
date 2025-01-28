import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSourcesOpen } from "./SourcesOpenContext";
import { truncateStringPreserveWords } from "@/lib/utils";

interface SourceCardProps {
  variant: string;
  title: string;
  images?: [string];
  displayLink: string;
  link: string;
  snippet: string;
}

export default function SourceCard({
  variant,
  title,
  images,
  displayLink,
  link,
  snippet,
}: SourceCardProps) {
  const { sourcesOpen, setSourcesOpen } = useSourcesOpen();
  const condesedDisplayLink = displayLink.split(".").at(-2);
  const faviconFromGoogle = `https://www.google.com/s2/favicons?domain=${displayLink}&sz=${128}`;
  const favicons =
    variant === "multiple sources"
      ? images?.map(
          (image) =>
            `https://www.google.com/s2/favicons?domain=${image}&sz=${128}`
        )
      : [];
  const avatar = (
    <Avatar className="w-4 h-4">
      <AvatarImage src={faviconFromGoogle} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
  const avatars = (
    <div className="flex gap-1">
      {favicons?.map((favicon, index) => (
        <Avatar key={index} className="w-[18px] h-[18px]">
          <AvatarImage src={favicon} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip open={variant === "multiple sources" ? false : undefined}>
        <TooltipTrigger asChild>
          <a
            onClick={
              variant === "multiple sources"
                ? () => setSourcesOpen(!sourcesOpen)
                : undefined
            }
            href={variant === "multiple sources" ? undefined : link}
            target={variant === "multiple sources" ? undefined : "_blank"}
            className={`${
              sourcesOpen && variant === "multiple sources"
                ? "dark:bg-superDark/20 ring-1 dark:ring-superDark/80"
                : "dark:bg-mainBackgroundDark"
            } ${
              !sourcesOpen ? "dark:hover:bg-offsetPlusDark" : ""
            } h-[84px] min-h-[60px] w-[163px] rounded-lg border-borderMain/10 border-[0.3px] p-2 transition-all duration-300 cursor-pointer`}
          >
            <div
              className={`${
                variant === "multiple sources" ? "justify-between" : ""
              } dark:text-textMainDark text-left text-xs flex flex-col justify-between gap-1 h-full line-clamp-3`}
            >
              {variant === "regular" && (
                <p>{truncateStringPreserveWords(title, 59)}</p>
              )}
              {variant === "multiple sources" && (
                <span className="">{avatars}</span>
              )}
              <div className="flex gap-1 items-center">
                {variant === "regular" && avatar}
                <span className="dark:text-textOffDark">
                  {variant === "regular"
                    ? condesedDisplayLink
                    : sourcesOpen
                    ? "Hide sources"
                    : "Show all"}
                </span>
              </div>
            </div>
          </a>
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
