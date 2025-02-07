/**

 *  Extract links from the top search results returned by the Google Custom Search JSON API.
 *  This function retrieves links from the first n results in the response, 
 *      sorted by relevancy as determined by the API.

 * @param {Array} searchResultsItems The top relevancy search resutls items.
 * @param {number} linksAmount The amount of links that will be extracted.
 
 * @return {Array} The links extracted from the top relevancy search results.
 */

export function extractSearchTopRelevancyResultsLinks(
  searchResultsItems,
  linksAmount
) {
  const itemsAmount = searchResultsItems.length;
  return searchResultsItems
    .slice(0, linksAmount > itemsAmount ? itemsAmount : linksAmount)
    .map((searchResultsItem) => searchResultsItem.link);
}
