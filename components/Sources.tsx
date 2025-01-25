import React from "react";
import { PiCirclesFourBold } from "react-icons/pi";
import SourceCard from "./SourceCard";
import SourceCardSkeleton from "./SourceCardSkeleton";

interface SourcesProps {
  summary?: { [key: string]: string };
  isLoading: boolean;
}

interface Pagemap {
  cse_thumbnail?: {
    src: string;
    width: string;
    height: string;
  }[];
  metatags?: {
    [key: string]: string | undefined; // Dynamic keys for metatags
  }[];
  cse_image?: {
    src: string;
  }[];
  organization?: {
    telephone: string;
    url: string;
  }[];
}

export interface Item {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: Pagemap; // Optional because it might not always exist
}

export default function Sources({ summary, isLoading }: SourcesProps) {
  console.log("isLoading in Sources: ", isLoading);
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2">
        <PiCirclesFourBold className="dark:text-textMainDark h-[17px] w-[17px] rotate-45" />
        <h4 className="font-medium text-lg dark:text-textMainDark">Sources</h4>
      </span>
      <div className="flex gap-2.5">
        {isLoading
          ? [0, 1, 2, 3].map((val, index) => <SourceCardSkeleton key={index} />)
          : summary && summary["search_results"]
          ? JSON.parse(summary.search_results)
              .items.slice(0, 4)
              .map(
                (source: Item, index: number) =>
                  source && (
                    <SourceCard
                      variant={index === 3 ? "multiple sources" : "regular"}
                      key={
                        Date.now() +
                        "-" +
                        Math.random().toString(36).substring(2, 9)
                      }
                      title={source.title}
                      snippet={source.snippet}
                      displayLink={source.displayLink} // Use the actual source data
                      link={source.link}
                      images={
                        index === 3
                          ? JSON.parse(summary.search_results)
                              .items.slice(4, 9)
                              .map((item: Item) => {
                                return item.displayLink ?? "";
                              })
                          : ""
                      }
                    />
                  )
              )
          : ""}
      </div>
    </div>
  );
}
