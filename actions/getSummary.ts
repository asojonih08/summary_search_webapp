"use server";

export async function getSummary(
  query: string
): Promise<{ [key: string]: string }> {
  if (query.length === 0) {
    return { something_went_wrong: "Please provide a valid search query." };
  }

  try {
    const response = await fetch("http://192.168.86.35:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search_query: query,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const summary: { [key: string]: string } = {};
    if (data.inference && data.search_results) {
      summary["answer"] = data.inference;
      console.log(summary["answer"]);
      summary["search_results"] = JSON.stringify(data.search_results);
      console.log(typeof summary["search_results"]);
    }

    // Ensure the `response` field is handled correctly
    return summary;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return {
      something_went_wrong: "An error occurred while fetching the summary.",
    };
  }
}
