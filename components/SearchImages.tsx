"use client";
import { getSearchImages } from "@/actions/getSearchImages";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Item } from "./Sources";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { IoClose } from "react-icons/io5";
import { Separator } from "./ui/separator";
import LogoIcon from "./LogoIcon";
import { Skeleton } from "./ui/skeleton";

interface SearchImagesProps {
  searchQuery: string;
  summary?: { [key: string]: string };
}

export default function SearchImages({
  searchQuery,
  summary,
}: SearchImagesProps) {
  const [searchImagesSelected, setSearchImagesSelected] = useState(false);
  const [searchImageLinks, setSearchImageLinks] = useState([]);
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(0);
  useEffect(() => {
    if (summary && summary["search_results"]) {
      console.log("Search Results: ", summary["search_results"]);
      const parsedItems = summary
        ? JSON.parse(summary["search_results"])
            .items.filter((item: Item) => item.pagemap?.cse_image?.[0]?.src)
            .map((item: Item) => item.pagemap.cse_image[0].src)
        : [];
      setSearchImageLinks(parsedItems);
    }
  }, [summary]);
  const { data: images, isLoading } = useQuery({
    queryKey: ["searchImages"], // Unique key
    queryFn: () => getSearchImages(searchImageLinks), // Fetch function
    enabled: searchImagesSelected && searchImageLinks.length > 0, // Run query only when enabled is true
  });
  console.log("Images: ", images);
  const avatars =
    searchImageLinks.length > 0
      ? searchImageLinks.map((imageLink: string, index) => (
          <Avatar key={index} className="w-3.5 h-3.5">
            <AvatarImage
              src={`https://www.google.com/s2/favicons?domain=${
                imageLink.split("/")[2]
              }&sz=${128}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ))
      : [];
  return (
    <div className="w-full h-auto">
      {!searchImagesSelected && (
        <div
          onClick={() => setSearchImagesSelected(!searchImagesSelected)}
          className="h-[41px] w-full dark:border-borderMain/50 bg-transparent border rounded-md px-4 py-2 flex justify-between items-center cursor-pointer dark:hover:bg-offsetDark transition-all duration-300"
        >
          <span className="flex items-center gap-2 dark:text-textMainDark font-medium">
            <FaRegImages /> Search Images
          </span>
          <FaPlus className="dark:text-superDark" />
        </div>
      )}
      {searchImagesSelected && !isLoading && (
        <div className="grid grid-cols-2 gap-2">
          {images &&
            images.slice(0, 5).map((image, index) =>
              index == 0 ? (
                <div
                  key={index}
                  onClick={() => {
                    setZoomedImageIndex(index);
                    setShowMoreImages(true);
                  }}
                  className="col-span-2 relative overflow-hidden dark:border-borderMain/50 border rounded-md h-[158px] hover:scale-[102%] transition-all duration-300 flex items-center justify-center cursor-zoom-in shadow-md hover:shadow-lg"
                >
                  <Image
                    alt={image.url}
                    src={image.data ?? ""}
                    fill
                    objectFit="cover"
                  ></Image>
                </div>
              ) : index !== 4 ? (
                <div
                  key={index}
                  onClick={() => {
                    setZoomedImageIndex(index);
                    setShowMoreImages(true);
                  }}
                  className="relative overflow-hidden bg-white rounded-md h-[86px] hover:scale-[102%] transition-all duration-300 cursor-zoom-in shadow-md hover:shadow-lg"
                >
                  <Image
                    alt={image.url}
                    src={image.data ?? ""}
                    fill
                    objectFit="cover"
                  />
                </div>
              ) : (
                <Dialog
                  key={index}
                  open={showMoreImages}
                  onOpenChange={() => setShowMoreImages(!showMoreImages)}
                >
                  <DialogTrigger>
                    <div className="overflow-hidden dark:bg-offsetDark/55 dark:hover:bg-offsetPlusDark/80 rounded-md h-[86px] hover:scale-[102%] transition-all duration-300 ease-in-out flex items-center cursor-pointer">
                      <div className="flex flex-col w-full gap-[13px]  justify-center p-2 pt-2.5">
                        <div className="flex gap-1 h-10  w-full justify-center">
                          {images.slice(4, 7).map((image, index) => (
                            <div
                              key={index}
                              className="h-[44px] w-[44px] relative"
                            >
                              <Image
                                className="rounded-sm"
                                key={index}
                                alt={image.url}
                                src={image.data ?? ""}
                                fill
                                objectFit="cover"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="dark:text-textOffDark font-medium text-xs flex items-center gap-1">
                          <FaRegImages /> View More
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[100vw] max-h-[100%] h-[100vh] dark:text-textMainDark dark:bg-[#020202] flex flex-col">
                    <DialogHeader className="h-10 flex justify-center">
                      <DialogTitle className="flex items-center pr-16 justify-between font-normal text-[28px] tracking-wide">
                        <span className="flex gap-3">
                          <LogoIcon className="h-9 w-9" />{" "}
                          {searchQuery.split(" ").length > 9
                            ? searchQuery.split(" ").slice(0, 10).join() + "..."
                            : searchQuery}
                        </span>
                        <div className="text-sm dark:border-borderMain/50 border rounded-3xl p-2 px-2.5 dark:hover:bg-[#202222] transition-all duration-300 ease-in-out cursor-pointer">
                          <a
                            href={images[zoomedImageIndex].url.split("/")[2]}
                            target={"_blank"}
                            className="flex items-center justify-center gap-1"
                          >
                            {avatars[zoomedImageIndex]}{" "}
                            {images[zoomedImageIndex].url.split("/")[2]}
                          </a>
                        </div>
                      </DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="w-full flex justify-center">
                      <Separator className="w-full my-0 h-[2.5px] dark:bg-borderMain/85" />
                    </div>
                    <DialogClose asChild>
                      <div className=" absolute top-3.5 right-3.5 z-50 bg-[#020202] h-16 w-16">
                        <Button
                          onClick={() => setShowMoreImages(false)}
                          className="absolute top-1.5 right-2 z-50 rounded-full w-10 h-10 m-0 p-0 dark:bg-offsetPlusDark group transition-colors duration-300 ease-out flex items-center justify-center [&_svg]:size-6"
                          variant={"link"}
                        >
                          <IoClose className="h-8 w-8 dark:text-textMainDark dark:group-hover:text-textOffDark transition-colors duration-300 ease-out" />
                        </Button>
                      </div>
                    </DialogClose>
                    <div className="h-full grid grid-cols-10 gap-3">
                      <div className="h-full w-full flex items-center justify-center col-span-7">
                        <a
                          href={images[zoomedImageIndex].url}
                          target={"_blank"}
                          className="py-4 ml-6 h-full w-full relative flex justify-between items-center rounded-md overflow-hidden"
                        >
                          <img
                            alt={images[zoomedImageIndex].url}
                            src={images[zoomedImageIndex].data ?? ""}
                            className={`object-cover rounded-md overflow-hidden max-h-[85vh] w-full cursor-pointer`}
                          ></img>
                        </a>
                      </div>
                      <div className="col-span-3 flex gap-2.5 overflow-y-scroll pt-1.5">
                        <div className="flex flex-col gap-2.5 ml-1.5">
                          {images
                            .slice(0, images.length / 2)
                            .map((image, index) => (
                              <img
                                key={index}
                                onClick={() => setZoomedImageIndex(index)}
                                className={`${
                                  zoomedImageIndex === index
                                    ? "ring-2 ring-[#15808d]"
                                    : "hover:opacity-65"
                                } border-black border rounded-lg transition-all duration-300 ease-in-out cursor-pointer`}
                                src={image.data}
                              ></img>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2.5 mr-1">
                          {images
                            .slice(images.length / 2 + 1)
                            .map((image, index) => (
                              <img
                                key={index}
                                onClick={() =>
                                  setZoomedImageIndex(
                                    index + images.length / 2 + 1
                                  )
                                }
                                className={`${
                                  zoomedImageIndex ===
                                  index + images.length / 2 + 1
                                    ? "ring-2 ring-[#15808d]"
                                    : "hover:opacity-65"
                                } rounded-lg transition-all duration-300 ease-in-out cursor-pointer`}
                                src={image.data}
                              ></img>
                            ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            )}
        </div>
      )}
      {isLoading && (
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="col-span-2 h-[158px] shadow-md"></Skeleton>{" "}
          {[0, 1, 2, 3].map((val) => (
            <Skeleton key={val} className="h-[86px] shadow-md"></Skeleton>
          ))}
        </div>
      )}
    </div>
  );
}
