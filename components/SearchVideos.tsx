import { getVideoSearchResults } from "@/actions/getVideoSearchResults";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaFilm } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import YoutubeDialog from "./YoutubeDialog";

interface SearchVideosProps {
  searchQuery: string;
}

export default function SearchVideos({ searchQuery }: SearchVideosProps) {
  const [searchVideosSelected, setSearchVideosSelected] = useState(false);
  const [videoDialogIsOpen, setVideoDialogIsOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");

  const { data: videoSearchResults, isLoading } = useQuery({
    queryKey: ["videoSearchResults", searchQuery], // Unique key
    queryFn: () => getVideoSearchResults(searchQuery), // Fetch function
    enabled: searchVideosSelected, // Run query only when enabled is true
  });
  return (
    <div className="w-full h-auto">
      {!searchVideosSelected && (
        <div
          onClick={() => setSearchVideosSelected(!searchVideosSelected)}
          className="h-[41px] w-full dark:border-borderMain/50 bg-transparent border rounded-md px-4 py-2 flex justify-between items-center cursor-pointer dark:hover:bg-offsetDark transition-all duration-300"
        >
          <span className="flex items-center gap-2 dark:text-textMainDark font-medium">
            <FaFilm /> Search Videos
          </span>
          <FaPlus className="dark:text-superDark" />
        </div>
      )}

      {videoSearchResults && (
        <div className="grid grid-cols-2 gap-2">
          {videoSearchResults.length > 0 &&
            videoSearchResults.map((videoSearchResult, index) => (
              <div
                onClick={() => {
                  setSelectedVideoId(videoSearchResult.id.videoId);
                  setVideoDialogIsOpen(!videoDialogIsOpen);
                }}
                key={index}
                className="group relative overflow-hidden bg-white rounded-md h-[110px] hover:scale-[102%] transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg aspect-video"
              >
                <Image
                  alt={videoSearchResult.snippet.description}
                  src={videoSearchResult.snippet.thumbnails.medium.url ?? ""}
                  fill
                  objectFit="cover"
                />
                <div className=" z-20 h-[110px] aspect-video group-hover:scale-[102%] opacity-0 group-hover:opacity-100 absolute bg-black/60 transition-opacity duration-100">
                  {" "}
                </div>
                <div className="z-50 pr-2 group-hover:opacity-100 opacity-0 absolute top-1.5 left-2 text-white drop-shadow-sm text-xs font-medium transition-opacity duration-100">
                  {videoSearchResult.snippet.title}
                </div>
                <div className="z-50 absolute right-2 bottom-1.5 text-white bg-black/80 font-medium text-xs flex gap-1 items-center rounded-sm px-[6px] py-[2px]">
                  Watch
                  <FaRegCirclePlay />
                </div>
              </div>
            ))}
        </div>
      )}
      {videoDialogIsOpen && (
        <YoutubeDialog
          open={videoDialogIsOpen}
          setOpen={setVideoDialogIsOpen}
          videoId={selectedVideoId}
        />
      )}
    </div>
  );
}
