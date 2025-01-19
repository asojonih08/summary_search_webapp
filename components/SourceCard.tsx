import React from "react";

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
    <div className="h-[84px] min-h-[60px] w-[163px] rounded-lg dark:bg-mainBackgroundDark dark:hover:bg-offsetPlusDark border-borderMain/10 border-[0.3px] p-2 transition-all duration-300 cursor-pointer">
      <div
        className={`${
          variant === "multiple sources" ? "justify-between" : ""
        } dark:text-textMainDark text-left text-xs flex flex-col gap-1 h-full`}
      >
        {variant === "regular" && (
          <p>Elon Musk weighs in on SpaceX Starships' 'rapid unscheduled...</p>
        )}
        {variant === "multiple sources" && <span className="">OOOOO</span>}
        <div className="flex gap-2">
          {variant === "regular" && <span>O</span>}
          <span className="dark:text-textOffDark">
            {variant === "regular" ? "foxbusiness" : "Show all"}
          </span>
        </div>
      </div>
    </div>
  );
}
