import React from "react";
import LogoIcon from "./LogoIcon";

export default function Logo() {
  return (
    <div className="flex gap-1 items-center">
      <LogoIcon className={`h-7 w-7 dark:text-superDark`} />
      <p className="dark:text-[#E8E8E6] text-[24px]">perplexity</p>
    </div>
  );
}
