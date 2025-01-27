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
import { Button } from "./ui/button";
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
      <DialogOverlay className="max-h-full h-full w-full max-w-full opacity-95 backdrop-blur-[8px] bg-[#ffffff]/20">
        <DialogContent className="[&>button]:hidden w-[75vw] aspect-video max-w-[75vw] p-0 rounded-2xl overflow-hidden shadow-lg">
          <VisuallyHidden className="rounded-2xl overflow-hidden shadow-lg">
            <DialogTitle>{videoId}</DialogTitle>
          </VisuallyHidden>
          <div className="aspect-video shadow-lg rounded-2xl">
            <YoutubeEmbed videoId={videoId} />
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
