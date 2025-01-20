import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function SourceCardSkeleton() {
  return (
    <Skeleton className="h-[84px] min-h-[60px] w-[163px] rounded-lg dark:bg-mainBackgroundDark border-borderMain/10 border"></Skeleton>
  );
}
