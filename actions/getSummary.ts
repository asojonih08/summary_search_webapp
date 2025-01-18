"use server";

export async function getSummary(query: string): Promise<string> {
  if (query.length === 0) {
    return "Please provide a valid search query.";
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/api", {
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

    // Ensure the `response` field is handled correctly
    return data.response || "No summary available.";
  } catch (error) {
    console.error("Error fetching summary:", error);
    return "An error occurred while fetching the summary.";
  }
}
