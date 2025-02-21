import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function DiscussionsCommentsSkeleton() {
  return (
    <>
      {[0, 1, 2].map((val) => (
        <Skeleton
          key={val}
          className="h-[100px] min-h-[60px] w-full rounded-lg dark:bg-mainBackgroundDark border-borderMain/10 border"
        ></Skeleton>
      ))}
    </>
  );
}
