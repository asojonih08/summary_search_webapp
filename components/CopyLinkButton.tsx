"use client";
import React, { useState } from "react";
import { FaCheck, FaLink } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname, useSearchParams } from "next/navigation";

export default function CopyLinkButton() {
  const [copyPressed, setCopyPressed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search_query = searchParams.get("q") || "";

  function handleCopyTimeout() {
    setCopyPressed(false);
  }
  function handleCopyClick() {
    setCopyPressed(true);
    navigator.clipboard.writeText(
      "http://localhost:3000" +
        pathname +
        "?q=" +
        search_query.split(" ").join("%20")
    );
    setTimeout(handleCopyTimeout, 2000);
  }
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => handleCopyClick()}
            variant={"outline"}
            className="dark:bg-superDark dark:text-[#191a1a] h-8 w-8 outline-none rounded-[0.25rem] dark:hover:bg-superDark hover:opacity-80  transition-all duration-300 ease-out"
          >
            {copyPressed ? (
              <FaCheck className="dark:text-[#191a1a] scale-[90%]" />
            ) : (
              <FaLink className="dark:text-[#191a1a] w-[17.5px] h-[17.5px]" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={7}
          className="dark:bg-offsetPlusDark text-xs py-1 px-2"
        >
          <p className="dark:text-textMainDark/95">Copy Link</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
