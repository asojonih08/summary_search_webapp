"use client";
import { getSearchImages } from "@/actions/getSearchImages";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaRegImages } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa6";
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
import { SearchResult } from "@/actions/getSearchResults";
import fallbackAvatar from "@/public/fallback-avatar.png";

interface SearchImagesProps {
  searchQuery: string;
  searchResults?: SearchResult[];
}

export default function SearchImages({
  searchQuery,
  searchResults,
}: SearchImagesProps) {
  // const [searchImagesSelected, setSearchImagesSelected] = useState(true);
  const [searchImageLinks, setSearchImageLinks] = useState<string[]>([]);
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [zoomedImageIndex, setZoomedImageIndex] = useState(0);
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

  console.log("Images: ", validImages);
  const [validFavicons, setValidFavicons] = useState<boolean[]>([]);

  useEffect(() => {
    setValidFavicons(new Array(searchImageLinks.length).fill(true)); // Initialize state for each image
  }, [searchImageLinks]);

  const avatars =
    searchImageLinks.length > 0
      ? searchImageLinks.map((imageLink: string, index) => {
          const faviconUrl = `https://www.google.com/s2/favicons?domain=${
            new URL(imageLink).hostname
          }&sz=128`;

          return (
            <Avatar key={index} className="w-3.5 h-3.5">
              {validFavicons[index] ? (
                <AvatarImage
                  src={faviconUrl}
                  onLoad={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (img.naturalWidth <= 16) {
                      setValidFavicons((prev) => {
                        const newFavicons = [...prev];
                        newFavicons[index] = false;
                        return newFavicons;
                      });
                    }
                  }}
                  onError={() =>
                    setValidFavicons((prev) => {
                      const newFavicons = [...prev];
                      newFavicons[index] = false;
                      return newFavicons;
                    })
                  }
                />
              ) : (
                <AvatarFallback className="w-3.5 h-3.5">
                  <Image alt="avatar" src={fallbackAvatar}></Image>
                </AvatarFallback> // Fallback if favicon is invalid
              )}
            </Avatar>
          );
        })
      : [];

  return (
    <div className="w-full h-auto">
      {/* {!searchImagesSelected && (
        <div
          onClick={() => setSearchImagesSelected(!searchImagesSelected)}
          className="h-[41px] w-full dark:border-borderMain/50 bg-transparent border rounded-md px-3.5 py-2 flex justify-between items-center cursor-pointer dark:hover:bg-offsetDark transition-all duration-300"
        >
          <span className="flex items-center gap-2 dark:text-textMainDark font-medium text-sm">
            <FaRegImages /> Search Images
          </span>
          <FaPlus className="dark:text-superDark" />
        </div>
      )} */}

      {!isLoading && validImages && (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
          {validImages &&
            validImages
              .filter(
                (image) =>
                  image.data && image.data?.split(";base64,").length > 1
              )
              .slice(0, 5)
              .map((image, index) =>
                index == 0 && image ? (
                  <div
                    key={index}
                    onClick={() => {
                      setZoomedImageIndex(index);
                      setShowMoreImages(true);
                    }}
                    className="lg:col-span-2 col-span-1 relative overflow-hidden dark:border-borderMain/50 border rounded-md h-[158px] hover:scale-[102%] transition-all duration-300 flex items-center justify-center cursor-zoom-in shadow-md hover:shadow-lg"
                  >
                    <Image
                      alt={image.url ?? "Image"}
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
                      alt={image.url ?? "Image"}
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
                            {validImages.slice(4, 7).map(
                              (image, index) =>
                                image.data &&
                                image.url && (
                                  <div
                                    key={index}
                                    className="h-[44px] w-[44px] relative"
                                  >
                                    <Image
                                      className="rounded-sm"
                                      key={index}
                                      alt={image.url ?? "Image"}
                                      src={image.data ?? ""}
                                      fill
                                      objectFit="cover"
                                    />
                                  </div>
                                )
                            )}
                          </div>
                          <span className="dark:text-textOffDark font-medium text-xs flex items-center gap-1">
                            <FaRegImages /> View More
                          </span>
                        </div>
                      </div>
                    </DialogTrigger>
                    {validImages.length > 0 &&
                      zoomedImageIndex >= 0 &&
                      zoomedImageIndex < validImages.length && (
                        <DialogContent className="max-w-[100vw] max-h-[100%] h-[100vh] dark:text-textMainDark dark:bg-[#020202] flex flex-col">
                          <DialogHeader className="h-10 flex justify-center">
                            <DialogTitle className="flex items-center pr-16 justify-between font-normal text-[28px] tracking-wide">
                              <span className="flex gap-3">
                                <LogoIcon className="h-9 w-9" />{" "}
                                {searchQuery.split(" ").length > 9
                                  ? searchQuery
                                      .split(" ")
                                      .slice(0, 10)
                                      .join(" ") + "..."
                                  : searchQuery}
                              </span>
                              <div className="text-sm dark:border-borderMain/50 border rounded-3xl p-2 px-2.5 dark:hover:bg-[#202222] transition-all duration-300 ease-in-out cursor-pointer">
                                <a
                                  href={
                                    validImages[zoomedImageIndex].url.split(
                                      "/"
                                    )[2]
                                  }
                                  target={"_blank"}
                                  className="flex items-center justify-center gap-1"
                                >
                                  {avatars[zoomedImageIndex]}{" "}
                                  {validImages[zoomedImageIndex].url.split(
                                    "/"
                                  )[2] ?? ""}
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
                                href={validImages[zoomedImageIndex].url}
                                target={"_blank"}
                                className="py-4 ml-6 h-full max-h-[85vh] w-full relative flex justify-between items-center rounded-md overflow-hidden"
                              >
                                <div className="relative w-full h-full rounded-md overflow-hidden">
                                  <Image
                                    alt={validImages[zoomedImageIndex].url}
                                    src={
                                      validImages[zoomedImageIndex].data ?? ""
                                    }
                                    fill
                                    objectFit="contain"
                                    sizes="(max-height: 85vh) 100vw"
                                    className={`cursor-pointer`}
                                  ></Image>
                                </div>
                              </a>
                            </div>
                            <div className="col-span-3 flex gap-2.5 overflow-y-scroll pt-1.5 h-content">
                              <div className="flex flex-col basis-1/2 gap-2.5 ml-1.5">
                                {validImages
                                  .slice(0, validImages.length / 2)
                                  .map(
                                    (image, index) =>
                                      image.data && (
                                        <div
                                          className="relative w-full"
                                          key={index}
                                        >
                                          <Image
                                            alt={image.url}
                                            width={0} // Set width and height to 0
                                            height={0}
                                            sizes="100vw" // Ensures responsiveness
                                            style={{
                                              width: "100%",
                                              height: "auto",
                                            }} // Allows aspect ratio to be preserved
                                            onClick={() =>
                                              setZoomedImageIndex(index)
                                            }
                                            className={`${
                                              zoomedImageIndex === index
                                                ? "ring-2 ring-[#15808d]"
                                                : "hover:opacity-65"
                                            } border-black border rounded-lg transition-all duration-300 ease-in-out cursor-pointer`}
                                            src={image.data ?? ""}
                                          ></Image>
                                        </div>
                                      )
                                  )}
                              </div>
                              <div className="flex flex-col basis-1/2 gap-2.5 mr-1">
                                {validImages
                                  .slice(validImages.length / 2 + 1)
                                  .map((image, index) => (
                                    <div
                                      className="relative w-full"
                                      key={index}
                                    >
                                      <Image
                                        alt={image.url}
                                        width={0} // Set width and height to 0
                                        height={0}
                                        sizes="100vw" // Ensures responsiveness
                                        style={{
                                          width: "100%",
                                          height: "auto",
                                        }} // Allows aspect ratio to be preserved
                                        onClick={() =>
                                          setZoomedImageIndex(
                                            Math.floor(validImages.length / 2) +
                                              1 +
                                              index
                                          )
                                        }
                                        className={`${
                                          zoomedImageIndex ===
                                          Math.floor(validImages.length / 2) +
                                            1 +
                                            index
                                            ? "ring-2 ring-[#15808d]"
                                            : "hover:opacity-65"
                                        } rounded-lg transition-all duration-300 ease-in-out cursor-pointer`}
                                        src={image.data ?? ""}
                                      ></Image>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      )}
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
