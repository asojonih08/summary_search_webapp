export function extractPostId(postUrl: string) {
  const match = postUrl.match(/\/comments\/([a-zA-Z0-9]+)\//);
  return match ? match[1] : null;
}
