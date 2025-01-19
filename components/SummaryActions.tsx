import React from "react";
import { Button } from "@/components/ui/button";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { FaRepeat } from "react-icons/fa6";

export default function SummaryActions() {
  return (
    <div className="flex justify-between dark:text-textOffDark mt-2">
      <div className="flex gap-1">
        <Button
          variant={"ghost"}
          className="rounded-3xl h-8 px-2 text-sm flex gap-1 items-center hover:text-textMainDark"
        >
          <FaRegShareFromSquare className="h-3.5 w-3.5" /> Share
        </Button>
        <Button
          variant={"ghost"}
          className="rounded-3xl h-8 px-2 text-sm flex gap-1 items-center hover:text-textMainDark"
        >
          <FaRepeat className="h-3.5 w-3.5" />
          Rewrite
        </Button>
      </div>
      <div></div>
    </div>
  );
}
