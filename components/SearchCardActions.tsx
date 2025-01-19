"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ListFilter, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SearchCardActionsProps {
  searchInput: string;
}

export default function SearchCardActions({
  searchInput,
}: SearchCardActionsProps) {
  const router = useRouter();
  async function handleSearchSubmit() {
    console.log("handleSearchSubmit");
    router.push(`/search/new?q=${searchInput}`);
  }
  return (
    <div className="flex justify-between items-center h-full dark:text-textOffDark">
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              className="rounded-3xl text-sm flex gap-1 items-center hover:text-textMainDark"
            >
              <ListFilter />
              <span className="font-medium">Focus</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="dark:bg-[#2D2F2F] dark:shadow-sm p-1.5 px-2 h-7 flex items-center justify-center">
            <p className="text-xs font-medium h-full">
              Set a focus for your sources
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex gap-3 items-center">
        <div className="flex gap-2">
          <Switch className="dark:border-borderMain/40 border-[1.8px] data-[state=checked]:dark:bg-mainBackgroundDark data-[state=unchecked]:dark:bg-mainBackgroundDark"></Switch>
          <span>Pro</span>
        </div>
        <Button
          onClick={() => handleSearchSubmit()}
          className={`${
            searchInput.length > 0
              ? "dark:bg-[#20B8CD] hover:dark:bg-[#20B8CD]/80 "
              : "dark:bg-[#2F302F] cursor-default hover:dark:bg-[#2F302F]"
          } group dark:text-textOffDark/50 transition-all duration-200 rounded-full w-8 h-8`}
        >
          <ArrowRight
            className={`${
              searchInput.length > 0
                ? "dark:text-contentBackgroundDark dark:bg-[#20B8CD] group-hover:dark:bg-transparent"
                : "dark:bg-[#2F302F]"
            } transition-all duration-200`}
          />
        </Button>
      </div>
    </div>
  );
}
