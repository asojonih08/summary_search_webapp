import jsdom, { JSDOM } from "jsdom";
import fetch from "node-fetch";
import { Agent } from "https";
import { Readability } from "@mozilla/readability";
import pLimit from "p-limit";

const limit = pLimit(5); // Only 5 concurrent fetches
// Use an agent to keep connections alive
const agent = new Agent({ keepAlive: true, maxSockets: 10 });
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
};

/**
 * Returns the HTML documents of the provided links.
 * @param {Array} links The links of the sites.
 * @return {Array} HTML documents retrieved from the links, maintaining the same order and length.
 */
async function retrieveHTMLDocs(links) {
  const fetchPromises = links.map((link) => limit(() => retrieveHTMLDoc(link)));
  const results = await Promise.all(fetchPromises);
  return results.map((result) => result.html || ""); // Replace failed fetches with an empty string
}

/**
 * Fetches a single HTML document from a given link.
 * @param {string} link The URL to fetch.
 * @return {Object} An object containing the URL and the HTML content or an empty string on failure.
 */
async function retrieveHTMLDoc(link) {
  try {
    const response = await fetch(link, { agent, headers, timeout: 2500 });
    if (!response.ok)
      throw new Error(`Failed to fetch ${link}: ${response.statusText}`);
    let html = await response.text();

    // Remove <style> and <script> tags
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

    return { html };
  } catch (error) {
    console.error(`Error fetching ${link}`, error);
    return { html: "" }; // Return an empty string on failure
  }
}

/**
 * Extracts the main readable content from an HTML document.
 * @param {string} htmlDocument The raw HTML content.
 * @return {string} Readable text extracted from the HTML.
 */
function extractReadableText(htmlDocument) {
  let dom = new JSDOM(htmlDocument);
  let reader = new Readability(dom.window.document);
  let article = reader.parse();

  if (!article || !article.content) return "";

  let articleDom = new JSDOM(article.content, {
    virtualConsole: new jsdom.VirtualConsole().sendTo(console, {
      omitJSDOMErrors: true,
    }),
  });
  let paragraphs = articleDom.window.document.querySelectorAll("p");
  return Array.from(paragraphs)
    .slice(0, 12)
    .map((p) => p.textContent.replace(/\s+/g, " ").trim())
    .join("\n\n");
}

export async function extractReadableTexts(links) {
  const htmlDocuments = await retrieveHTMLDocs(links); // Ensure we wait for HTML retrieval

  let scrapedDocuments = {};
  links.forEach((link, index) => {
    scrapedDocuments[link] =
      htmlDocuments[index].length > 0
        ? extractReadableText(htmlDocuments[index])
        : "";
    // console.log(
    //   "Link (",
    //   link,
    //   ")\n\nScraped Paragraphs:\n",
    //   scrapedDocuments[link]
    // );
  });

  return scrapedDocuments;
}
