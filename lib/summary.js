import { extractReadableTexts } from "./scraper.js";
import { extractSearchTopRelevancyResultsLinks } from "./summarizerUtils.js";

/**

 *  Builds a prompt that will used to produce the summary of the scraped documents.

 * @param {string} searchQuery  The search terms used for the Google Custom Search Api.
 * @param {{[key: string]: string}} scrapedDocuments An object with (key: link, value: The first n paragaphs of the 
        scraped HTML document).
 
 * @return {string} The links extracted from the top relevancy search results.
 */
function buildPromptStructure(searchQuery, scrapedDocuments) {
  let prompt = `
    I have compiled the first 10 paragraphs of text from the most relevant results that a Google search for the query "${searchQuery}" returned.
    Using the provided sources, construct a concise summary of around 250 - 300 words that is highly relevant to the search query. 

    The summary should:
    1. Clearly represent the main ideas and insights from the sources without unnecessary repetition.
    2. Attribute information to its respective source by including the source number (e.g., [1], [2], [3]) immediately after the relevant part of the summary.
    3. Integrate information smoothly from multiple sources when possible while maintaining logical flow and coherence.
    4. Utilize markdown to cleanly format your output.
    5. Bold key subject matter and potential areas that may need expanded information.
    6. Present a brief introduction. Then, key points or insights when appropriate in bullet or numbered format, and finally a conlusion that summarizes.
    7. Avoid using words like "In conclusion" and "introduction".

    Here are the sources, stripped of all HTML syntax tags and presented in plain text, with each source labeled and numbered for reference:
    `;
  // console.log("Scraped documents keys: ", Object.keys(scrapedDocuments));
  let index = 1;
  for (const key of Object.keys(scrapedDocuments)) {
    // console.log("Scraped paragraphs [", index, "]:\n\n", scrapedDocuments[key]);
    if (scrapedDocuments[key] && scrapedDocuments[key].length > 0) {
      prompt += `\n[${index}]: ${scrapedDocuments[key]}\n`;
    }
    index++;
  }
  prompt +=
    "Please generate the summary in accordance with these instructions. In your response do not include any reference to this prompt.";
  // console.log("Prompt: ", prompt);
  // console.log("Word count: ", prompt.split(" ").length);
  return prompt;
}

export async function summarizePromptBuilder(searchQuery, searchResultsItems) {
  console.time("Link extraction");
  const links = extractSearchTopRelevancyResultsLinks(searchResultsItems, 10);
  console.timeEnd("Link extraction");
  console.time("Extracting readable text");
  const scrapedDocuments = await extractReadableTexts(links);
  console.timeEnd("Extracting readable text");
  return buildPromptStructure(searchQuery, scrapedDocuments);
}
