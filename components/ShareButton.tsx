import React from "react";
import { Button } from "./ui/button";
import { FaRegShareFromSquare } from "react-icons/fa6";

export default function ShareButton() {
  return (
    <Button
      variant={"outline"}
      className="text-sm font-base dark:bg-superDark dark:text-[#191a1a] h-8 w-[76px] outline-none rounded-[0.25rem] dark:hover:bg-superDark hover:opacity-80 transition-all duration-300 ease-out flex gap-1"
    >
      <FaRegShareFromSquare className="dark:text-[#191a1a] w-[17.5px] h-[17.5px]" />
      <span className="dark:text-[#191a1a] text-sm">Share</span>
    </Button>
  );
}
