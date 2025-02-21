import React from "react";
import { motion } from "framer-motion";
import { PiCirclesFourBold } from "react-icons/pi";
import { Button } from "./ui/button";
import { useSourcesOpen } from "./SourcesOpenContext";
import { IoClose } from "react-icons/io5";
import SourceCardFull from "./SourceCardFull";
import { SearchResult } from "@/actions/getSearchResults";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface AllSourcesListProps {
  searchResults?: SearchResult[];
}

export default function AllSourcesList({ searchResults }: AllSourcesListProps) {
  const { sourcesOpen, setSourcesOpen } = useSourcesOpen();
  return (
    <div className="sticky top-[48px] z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0 }}
        className="isolate sticky top-[48px] md:block hidden"
      >
        <div className="grid flex-col border border-borderMain/50 rounded-sm overflow-y-hidden">
          <span className="dark:text-textMainDark text-lg h-12 font-medium p-2 border-b border-borderMain/50 flex justify-between items-center pr-3">
            <div className="flex gap-1.5 items-center">
              <PiCirclesFourBold className="dark:text-textMainDark h-[18px] w-[18px] rotate-45 mb-0.5" />
              <h2>{searchResults ? searchResults.length : "-"} sources</h2>
            </div>
            <Button
              onClick={() => setSourcesOpen(!sourcesOpen)}
              className="rounded-full w-8 h-8 p-0 dark:hover:bg-offsetPlusDark group transition-colors duration-300 ease-out "
              variant={"link"}
            >
              <IoClose className="dark:text-textOffDark dark:group-hover:text-textMainDark text-base transition-colors duration-300 ease-out" />
            </Button>
          </span>

          {searchResults ? (
            <div className="flex flex-col gap-2 px-2 py-2 overflow-y-scroll ">
              {searchResults.map(
                (searchResult: SearchResult, index: number) => (
                  <SourceCardFull
                    sourceNumber={index + 1}
                    key={
                      Date.now() +
                      "-" +
                      Math.random().toString(36).substring(2, 9)
                    }
                    title={searchResult.title}
                    snippet={searchResult.snippet}
                    displayLink={searchResult.displayLink} // Use the actual source data
                    link={searchResult.link}
                  />
                )
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </motion.div>
      {window.innerWidth < 768 && (
        <div className="max-h-full h-full">
          <Drawer open={sourcesOpen} onOpenChange={setSourcesOpen}>
            <DrawerOverlay className="md:hidden md:opacity-0 block bg-slate-600/15 dark:backdrop-blur-sm z-50">
              <DrawerContent className="h-[76%]">
                <div className="mt-8 grid flex-col gap-2 h-[calc(100vh_-48px-5rem)] border border-borderMain/50 rounded-sm overflow-y-hidden">
                  <span className="dark:text-textMainDark text-lg font-medium p-2 border-b border-borderMain/50 flex justify-between items-center pr-3">
                    <div className="flex gap-1.5 items-center">
                      <PiCirclesFourBold className="dark:text-textMainDark h-[18px] w-[18px] rotate-45 mb-0.5" />
                      <h2>
                        {searchResults ? searchResults.length : "-"} sources
                      </h2>
                    </div>
                  </span>

                  {searchResults ? (
                    <div className="flex flex-col gap-2 px-2 pb-2 overflow-y-scroll">
                      {searchResults.map(
                        (searchResult: SearchResult, index: number) => (
                          <SourceCardFull
                            sourceNumber={index + 1}
                            key={
                              Date.now() +
                              "-" +
                              Math.random().toString(36).substring(2, 9)
                            }
                            title={searchResult.title}
                            snippet={searchResult.snippet}
                            displayLink={searchResult.displayLink} // Use the actual source data
                            link={searchResult.link}
                          />
                        )
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <VisuallyHidden>
                  <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                </VisuallyHidden>

                {/* <DrawerFooter>
                  <DrawerClose asChild>
                    <Button
                      className="dark:text-textMainDark"
                      variant="outline"
                    >
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter> */}
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </div>
      )}
    </div>
  );
}
