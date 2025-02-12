import React from "react";
import LogoIcon from "./LogoIcon";

interface LogoProps {
  size?: string;
}

export default function Logo({ size = "medium" }: LogoProps) {
  const iconSize =
    size === "medium" ? "h-7 w-7" : size === "large" ? "w-9 h-9" : "";
  const textSize =
    size === "medium"
      ? "text-[23.5px]"
      : size === "large"
      ? "text-[25.5px]"
      : "";
  return (
    <div className="flex gap-1 items-center">
      <LogoIcon className={`${iconSize} dark:text-superDark`} />
      <p className={`${textSize} dark:text-[#E8E8E6] tracking-[0.015em]`}>
        perplexity
      </p>
    </div>
  );
}
