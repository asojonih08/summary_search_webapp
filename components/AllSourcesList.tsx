import React from "react";
import { motion } from "framer-motion";
import { PiCirclesFourBold } from "react-icons/pi";
import { Button } from "./ui/button";
import { useSourcesOpen } from "./SourcesOpenContext";
import { IoClose } from "react-icons/io5";
import SourceCardFull from "./SourceCardFull";
import { Item } from "./Sources";

interface AllSourcesListProps {
  summary?: { [key: string]: string };
}

export default function AllSourcesList({ summary }: AllSourcesListProps) {
  const { sourcesOpen, setSourcesOpen } = useSourcesOpen();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
      className="isolate sticky top-[48px]"
    >
      <div className="sticky top-[48px] z-10 grid flex-col gap-2 h-[calc(100vh_-48px-5rem)] border border-borderMain/50 rounded-sm overflow-y-hidden">
        <span className="dark:text-textMainDark text-lg font-medium p-2 border-b border-borderMain/50 flex justify-between items-center pr-3">
          <div className="flex gap-1.5 items-center">
            <PiCirclesFourBold className="dark:text-textMainDark h-[18px] w-[18px] rotate-45 mb-0.5" />
            <h2>
              {summary && summary["search_results"]
                ? JSON.parse(summary.search_results).items.length
                : "-"}{" "}
              sources
            </h2>
          </div>
          <Button
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="rounded-full w-8 h-8 p-0 dark:hover:bg-offsetPlusDark group transition-colors duration-300 ease-out "
            variant={"link"}
          >
            <IoClose className="dark:text-textOffDark dark:group-hover:text-textMainDark text-base transition-colors duration-300 ease-out" />
          </Button>
        </span>

        {summary && summary["search_results"] ? (
          <div className="flex flex-col gap-2 px-2 pb-2 overflow-y-scroll ">
            {JSON.parse(summary.search_results).items.map(
              (source: Item, index: number) =>
                source && (
                  <SourceCardFull
                    sourceNumber={index + 1}
                    key={
                      Date.now() +
                      "-" +
                      Math.random().toString(36).substring(2, 9)
                    }
                    title={source.title}
                    snippet={source.snippet}
                    displayLink={source.displayLink} // Use the actual source data
                    link={source.link}
                  />
                )
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </motion.div>
  );
}
