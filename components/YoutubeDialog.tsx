import React, { Dispatch, SetStateAction } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import YoutubeEmbed from "./YoutubeEmbed";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "./ui/dialog";

import { IoClose } from "react-icons/io5";

interface YoutubeDialogProps {
  videoId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function YoutubeDialog({
  videoId,
  open,
  setOpen,
}: YoutubeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogOverlay className="z-50 dark:bg-transparent">
        <DialogContent
          onClick={() => setOpen(false)}
          className=" dark:bg-white/5 dark:backdrop-blur-md max-h-full h-full w-full max-w-full bg-white/5 flex justify-center items-center"
        >
          <DialogClose className="group absolute top-4 right-5 z-50 w-8 h-8 rounded-full dark:bg-white/70 flex justify-center items-center transition-all duration-300">
            <IoClose className="group-hover:dark:text-offsetPlusDark/60 dark:text-mainBackgroundDark h-6 w-6 transition-all duration-300" />
          </DialogClose>
          <VisuallyHidden className="rounded-2xl overflow-hidden">
            <DialogTitle>{videoId}</DialogTitle>
          </VisuallyHidden>
          <div className="aspect-video w-[75vw] shadow-lg shadow-[#0a0606] rounded-2xl overflow-hidden z-[100]">
            <YoutubeEmbed videoId={videoId} />
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
