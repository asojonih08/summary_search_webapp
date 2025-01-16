import React from "react";
import { Button } from "@/components/ui/button";
import { ListFilter, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SearchCardActions() {
  return (
    <div className="flex justify-between items-center h-full dark:text-textOffDark">
      <Button
        variant={"ghost"}
        className="rounded-3xl text-sm flex gap-1 items-center h-9 p-2.5 hover:text-textMainDark "
      >
        <ListFilter className=""></ListFilter>
        <span className="font-medium">Focus</span>
      </Button>
      <div className="flex gap-3 items-center">
        <div className="flex gap-2">
          <Switch className="dark:border-borderMain/40 border-[1.8px] data-[state=checked]:dark:bg-mainBackgroundDark data-[state=unchecked]:dark:bg-mainBackgroundDark"></Switch>
          <span>Pro</span>
        </div>
        <Button className="dark:bg-[#2F302F] hover:dark:bg-[#20B8CD] dark:text-textOffDark/50 rounded-full w-8 h-8">
          <ArrowRight className="" />
        </Button>
      </div>
    </div>
  );
}
