"use server";
const REDDIT_CLIENT_ID = process.env.REDDIT_API_DEV_SCRIPT_CLIENT_ID!;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_API_DEV_SCRIPT_SECRET!;
const REDDIT_USERNAME = process.env.REDDIT_USERNAME!;
const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD!;
const url = new URL("https://www.reddit.com/api/v1/access_token");
const searchParams = {
  grant_type: "password",
  username: REDDIT_USERNAME,
  password: REDDIT_PASSWORD,
};
url.search = new URLSearchParams(searchParams).toString();

export async function getRedditAccessToken() {
  console.log("Get reddit access token url: ", url.toString());
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(
        `${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`
      )}`,
      "User-Agent": "NextJSRedditApp/1.0 (by /u/asojonih)",
    },
  });
  if (!response.ok) return new Error("Network response was not ok");
  const data = await response.json();
  return data.access_token;
}
