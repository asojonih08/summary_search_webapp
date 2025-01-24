import React, { useMemo } from "react";
import AnswerSkeleton from "./AnswerSkeleton";
import SourceCircleTooltip from "./SourceCircleTooltip";
import LoadingLogoIcon from "./LoadingLogoIcon";
import Markdown from "react-markdown";

interface AnswerProps {
  summary?: { [key: string]: string };
  isLoading: boolean;
}

function constructSummaryWithReplacements(
  processedText: string,
  sourcesDivsArray: React.ReactNode[]
) {
  const jsx: React.ReactNode[] = [];
  const regex = /<span[^>]*>.*?<\/span>/g;
  const processedTextArray = processedText.split(regex);
  for (let index = 0; index < processedTextArray.length; index++) {
    jsx.push(
      <Markdown
        key={`text-${index}`}
        components={{
          p: ({ children }) => <span className="">{children}</span>, // Render <p> as <span>
        }}
      >
        {processedTextArray[index]}
      </Markdown>
    );
    jsx.push(sourcesDivsArray[index]);
    index++;
  }
  return jsx;
}

export default function Answer({ summary, isLoading }: AnswerProps) {
  const answerTitle = useMemo(
    () => (
      <h4 className="font-medium text-lg dark:text-textMainDark">Answer</h4>
    ),
    []
  );
  const searchResults =
    summary && summary["search_results"]
      ? JSON.parse(summary.search_results)
      : "";
  const searchResultsItems = searchResults === "" ? [] : searchResults["items"];

  // const text =
  //   'According to the Household Pulse Survey conducted by the U.S. Census Bureau and analyzed by CDC\'s National Center for Health Statistics, nearly one in five American adults who have had COVID-19 (19%) are currently experiencing symptoms of "long COVID" [1]. This accounts for approximately 40% of all adults who reported having COVID-19, with 7.5% of the overall population suffering from long COVID symptoms [1]. Women are more likely to experience long COVID than men (9.4% vs. 5.5%), while older adults are less likely to have long COVID than younger adults [1]. Interestingly, research is also being conducted on individuals who have avoided COVID-19 altogether or showed no symptoms when infected, often referred to as "super-dodgers" or "Novids" [3]. Scientists believe that studying these individuals may hold the key to understanding how some people develop protective antibodies or genetic codes that prevent them from getting sick with COVID-19. According to Dr. Sabrina Assoumou of Boston University, it is likely a combination of factors, including vaccination, cautious behavior, socioeconomic status, and luck, that contributes to an individual\'s ability to avoid COVID-19 [3]. The study of these individuals has the potential to provide valuable insights into developing better vaccines or treatments for everyone. Dr. Assoumou notes that understanding why some people are able to avoid infection could lead to breakthroughs similar to those made in HIV research, where scientists discovered a genetic mutation that prevents the virus from entering cells [3]. This knowledge could potentially be used to create more effective prevention strategies and treatments for COVID-19. It is worth noting that despite some inconsistent reporting of symptoms, studies have demonstrated that at least 20% of individuals infected with SARS-CoV-2 will remain asymptomatic [3]. This highlights the importance of further research into understanding why some people are able to avoid infection or show no symptoms when infected.';
  const regex =
    /\(Source\s([1-9]|10)\)|\[([1-9]|10)\]|\(([1-9]|10)\)|\(\[([1-9]|10)\]\)/g;
  const sourcesDivsArray: React.ReactNode[] = [];
  // Process the text and replace matches with JSX
  let processedText = "";
  if (summary && summary["answer"])
    processedText = (summary ? summary["answer"] : "").replace(
      regex,
      (match, group1, group2, group3) => {
        // Extract the number from the capturing groups
        const number = group1 || group2 || group3;

        sourcesDivsArray.push(
          <SourceCircleTooltip
            sourceNumber={number}
            key={Math.random()}
            title={
              searchResultsItems.length > 0
                ? searchResultsItems[number - 1].title
                : ""
            }
            snippet={
              searchResultsItems.length > 0
                ? searchResultsItems[number - 1].snippet
                : ""
            }
            displayLink={
              searchResultsItems.length > 0
                ? searchResultsItems[number - 1].displayLink
                : ""
            } // Use the actual source data
            link={
              searchResultsItems.length > 0
                ? searchResultsItems[number - 1].link
                : ""
            }
          />
        );
        return `<span></span>`;
      }
    );
  const jsxAnswer = constructSummaryWithReplacements(
    processedText,
    sourcesDivsArray
  );
  console.log(jsxAnswer);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        {" "}
        <LoadingLogoIcon
          className="h-5 w-5 dark:text-textMainDark"
          isLoading={isLoading}
        />
        {answerTitle}
      </div>
      <span className="dark:text-textMainDark text-justify ">
        {isLoading ? (
          <AnswerSkeleton />
        ) : (
          <span className="justify-center items-center whitespace-pre-line">
            {jsxAnswer.map((element: React.ReactNode) => element)}
          </span>
        )}
      </span>
    </div>
  );
}
