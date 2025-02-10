import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

export const Model = {
  OPENAI: {
    GPT_4O_MINI: openai("gpt-4o-mini"),
    GPT_4O: openai("gpt-4o"),
    O3_MINI: openai("o3-mini"),
    O1_MINI: openai("o1-mini"),
  },
  ANTHROPIC: {
    CLAUDE_3_5_SONNET: anthropic("claude-3-5-sonnet-20241022"),
    CLAUDE_3_5_HAIKU: anthropic("claude-3-5-haiku-20241022"),
  },
};
