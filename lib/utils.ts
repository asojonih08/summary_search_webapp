import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateStringPreserveWords(
  str: string,
  limit: number
): string {
  if (str.length <= limit) return str;

  const words = str.split(" ");
  let truncated = "";

  for (const word of words) {
    if (truncated.length + word.length + 1 > limit) {
      break;
    }
    truncated += (truncated ? " " : "") + word;
  }

  return truncated + "...";
}
