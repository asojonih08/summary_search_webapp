"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname, useSearchParams } from "next/navigation";

export default function SummaryActions() {
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
    <div className="flex justify-between dark:text-textOffDark mt-3">
      <div className="flex gap-1">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                className="rounded-3xl h-8 px-2 text-sm flex gap-1 items-center dark:hover:text-textMainDark dark:hover:bg-offsetDark"
              >
                <FaRegShareFromSquare className="h-3.5 w-3.5" /> Share
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={8}
              className="dark:bg-offsetDark text-xs font-medium h-7 px-2"
            >
              <p>Share Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant={"ghost"}
          className="rounded-3xl h-8 px-2 text-sm flex gap-1 items-center dark:hover:text-textMainDark dark:hover:bg-offsetDark"
        >
          <FaRepeat className="h-3.5 w-3.5" />
          Rewrite
        </Button>
      </div>
      <div className="flex gap-1">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleCopyClick()}
                variant={"ghost"}
                className="rounded-3xl h-8 px-2 text-sm flex gap-1 items-center dark:hover:text-textMainDark dark:hover:bg-offsetDark"
              >
                {copyPressed ? (
                  <FaCheck className="h-2.5 w-2.5" />
                ) : (
                  <FaRegCopy className="h-3.5 w-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={8}
              className="dark:bg-offsetDark text-xs font-medium h-7 px-2"
            >
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          variant={"ghost"}
          className="rounded-3xl h-8 px-2 text-sm flex gap-1 items-center dark:hover:text-textMainDark dark:hover:bg-offsetDark"
        >
          <FaEllipsis className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
