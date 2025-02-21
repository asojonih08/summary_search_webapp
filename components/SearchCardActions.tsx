"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import FocusSelection from "./FocusSelection";
import { useSourceFocus } from "./SourceFocusContext";

interface SearchCardActionsProps {
  searchInput: string;
}

export default function SearchCardActions({
  searchInput,
}: SearchCardActionsProps) {
  const router = useRouter();
  const { sourceFocusSelection } = useSourceFocus();
  async function handleSearchSubmit() {
    console.log("handleSearchSubmit");
    router.push(
      `/search/new?q=${searchInput}&source-focus=${sourceFocusSelection}`
    );
  }
  return (
    <div className="flex justify-between items-center h-full dark:text-textOffDark z-50">
      <FocusSelection />
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 items-center">
          <Switch className="dark:border-borderMain/40 border-[1.8px] data-[state=checked]:dark:bg-mainBackgroundDark data-[state=unchecked]:dark:bg-mainBackgroundDark"></Switch>
          <span className="text-[14px]">Pro</span>
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
