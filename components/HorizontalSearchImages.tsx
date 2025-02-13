"use client";
import { getSearchImages } from "@/actions/getSearchImages";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { TbWorld } from "react-icons/tb";

import { Skeleton } from "./ui/skeleton";
import { SearchResult } from "@/actions/getSearchResults";
import { IoClose } from "react-icons/io5";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowUpRight } from "lucide-react";

interface HorizontalSearchImagesProps {
  searchQuery: string;
  searchResults?: SearchResult[];
}

export default function HorizontalSearchImages({
  searchQuery,
  searchResults,
}: HorizontalSearchImagesProps) {
  const [searchImageLinks, setSearchImageLinks] = useState<string[]>([]);
  useEffect(() => {
    if (searchResults) {
      const parsedItems = searchResults
        ? searchResults
            .filter(
              (searchResult: SearchResult) =>
                searchResult.pagemap?.cse_image?.[0]?.src
            )
            .map((searchResult: SearchResult) =>
              searchResult.pagemap && searchResult.pagemap.cse_image
                ? searchResult.pagemap.cse_image[0].src
                : ""
            )
        : [];
      setSearchImageLinks(parsedItems);
    }
  }, [searchResults]);
  const { data: images, isLoading } = useQuery({
    queryKey: ["searchImages", searchQuery], // Unique key
    queryFn: () => getSearchImages(searchImageLinks), // Fetch function
    enabled: searchImageLinks.length > 0, // Run query only when enabled is true
  });
  const validImages = images
    ? images.filter((image) => image?.data && image?.url)
    : [];

  return (
    <div className="sm:h-[120px] h-[150px] sm:my-4 my-5 w-full">
      {!isLoading && validImages && (
        <Carousel opts={{ skipSnaps: true }}>
          <CarouselContent className="mx-3 gap-3 sm:w-[115%] w-[110%]">
            {validImages.map((image, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <CarouselItem className="aspect-video h-full sm:basis-1/3 basis-1/2 relative cursor-zoom-in hover:scale-[102%] antialiased transition-all duration-300">
                    <Image
                      style={{ borderRadius: "8px" }}
                      alt={image.url ?? "Image"}
                      src={image.data ?? ""}
                      fill
                      objectFit="cover"
                    ></Image>
                  </CarouselItem>
                </DialogTrigger>
                <DialogOverlay className="z-50 dark:bg-transparent">
                  <DialogContent className=" dark:bg-white/5 dark:backdrop-blur-md max-h-full h-full w-full max-w-full bg-white/5 flex justify-center items-center">
                    <DialogClose className="group absolute top-4 right-5 z-50 w-8 h-8 rounded-full dark:bg-white/70 flex justify-center items-center transition-all duration-300">
                      <IoClose className="group-hover:dark:text-offsetPlusDark/60 dark:text-mainBackgroundDark h-6 w-6 transition-all duration-300" />
                    </DialogClose>
                    <VisuallyHidden className="rounded-2xl overflow-hidden">
                      <DialogTitle>{image.url}</DialogTitle>
                    </VisuallyHidden>
                    <div className="flex flex-col w-full h-[80%] justify-center items-center">
                      <div className="w-[70%] h-[50%] relative">
                        <Image
                          style={{ borderRadius: "8px" }}
                          alt={image.url ?? "Image"}
                          src={image.data ?? ""}
                          fill
                          objectFit="contain"
                        ></Image>
                      </div>
                      <a href={image.url} target={"_blank"}>
                        <div className="rounded-2xl dark:bg-offsetDark/80 dark:text-textMainDark flex items-center justify-between gap-2 h-9 w-[240px] px-3">
                          <TbWorld />
                          <span className="line-clamp-1 basis-[76%] text-sm">
                            {image.url}
                          </span>
                          <ArrowUpRight className=" h-4 w-4" />
                        </div>
                      </a>
                    </div>
                  </DialogContent>
                </DialogOverlay>
              </Dialog>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      {isLoading && (
        <div className="grid sm:grid-cols-3 grid-cols-2  gap-2">
          <Skeleton className="sm:h-[120px] h-[150px] shadow-md sm:block hidden"></Skeleton>
          {[0, 1].map((val) => (
            <Skeleton
              key={val}
              className="sm:h-[120px] h-[150px] shadow-md"
            ></Skeleton>
          ))}
        </div>
      )}
    </div>
  );
}
