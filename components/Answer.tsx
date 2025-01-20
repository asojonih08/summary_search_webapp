import { getSummary } from "@/actions/getSummary";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import Markdown from "react-markdown";
import AnswerSkeleton from "./AnswerSkeleton";

interface AnswerProps {
  summary?: { [key: string]: string };
  isLoading: boolean;
}

export default function Answer({ summary, isLoading }: AnswerProps) {
  const answerTitle = useMemo(
    () => (
      <h4 className="font-medium text-lg dark:text-textMainDark">Answer</h4>
    ),
    []
  );

  return (
    <div className="flex flex-col gap-3">
      {answerTitle}
      <span className="dark:text-textMainDark text-justify ">
        {isLoading ? (
          <AnswerSkeleton />
        ) : (
          <span className="whitespace-pre-line text-base">
            <Markdown>
              {summary &&
                (summary["answer"] ?? summary["something_went_wrong"])}
            </Markdown>
          </span>
        )}
      </span>
    </div>
  );
}
