import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SourceCardFullProps {
  title: string;
  displayLink: string;
  link: string;
  snippet: string;
  sourceNumber: number;
}

export default function SourceCardFull({
  title,
  displayLink,
  link,
  snippet,
  sourceNumber,
}: SourceCardFullProps) {
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
    <a
      href={link}
      target={"_blank"}
      className={`w-full h-[160px] rounded-lg dark:bg-mainBackgroundDark dark:hover:bg-offsetPlusDark border-borderMain/10 border-[0.3px] p-2 py-3 transition-all duration-300 cursor-pointer`}
    >
      <div
        className={`dark:text-textMainDark text-left text-sm flex flex-col justify-between gap-1 h-full`}
      >
        <p>
          <span className="dark:text-textOffDark font-medium">
            {sourceNumber}.
          </span>
          {titleSplit.length < 15
            ? " " + titleSplit.join(" ")
            : " " + titleSplit.slice(0, 15).join(" ") + "..."}
        </p>

        <div className="flex gap-1 items-center">
          {avatar}
          <span className="dark:text-textOffDark text-sm">
            {condesedDisplayLink} ·{" "}
            <span className="text-xs">{sourceNumber}</span>
          </span>
        </div>
        <span className="text-xs">{snippet}</span>
      </div>
    </a>
  );
}
