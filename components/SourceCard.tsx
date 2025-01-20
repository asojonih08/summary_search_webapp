import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SourceCardProps {
  variant: string;
  title: string;
  image?: string;
  images?: [string];
  source: string;
}

export default function SourceCard({
  variant,
  title,
  image,
  images,
  source,
}: SourceCardProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip open={variant === "multiple sources" ? false : undefined}>
        <TooltipTrigger asChild>
          <div className="h-[84px] min-h-[60px] w-[163px] rounded-lg dark:bg-mainBackgroundDark dark:hover:bg-offsetPlusDark border-borderMain/10 border-[0.3px] p-2 transition-all duration-300 cursor-pointer">
            <div
              className={`${
                variant === "multiple sources" ? "justify-between" : ""
              } dark:text-textMainDark text-left text-xs flex flex-col gap-1 h-full`}
            >
              {variant === "regular" && (
                <p>
                  Elon Musk weighs in on SpaceX Starships' 'rapid unscheduled...
                </p>
              )}
              {variant === "multiple sources" && (
                <span className="">OOOOO</span>
              )}
              <div className="flex gap-2">
                {variant === "regular" && <span>O</span>}
                <span className="dark:text-textOffDark">
                  {variant === "regular" ? "foxbusiness" : "Show all"}
                </span>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="dark:bg-contentBackgroundDark dark:border-borderMain/50 shadow-lg rounded-lg  py-[14px] px-4 w-80 h-auto flex flex-col gap-1.5 text-left"
        >
          <div className="flex gap-2">
            {variant === "regular" && <span>O</span>}
            <span className="dark:text-textOffDark">
              {variant === "regular" ? "foxbusiness" : "Show all"}
            </span>
          </div>
          <a href="">
            <h3 className="text-sm font-medium h-full dark:hover:text-superDark transition-colors duration-150">
              Elon Musk weighs in on SpaceX Starships' 'rapid unscheduled...{" "}
              {/*{title} */}
            </h3>
          </a>
          <p className="text-sm h-full">
            Our guide to the best running shoes available at the moment,
            including best race shoes, best cushioned shoes, best daily shoes
            and value options
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
