import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function SearchVideosSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="group relative overflow-hidden bg-transparent rounded-md w-full hover:scale-[102%] transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg aspect-video"
        >
          <Skeleton className="h-full w-full"></Skeleton>
        </div>
      ))}
    </>
  );
}
