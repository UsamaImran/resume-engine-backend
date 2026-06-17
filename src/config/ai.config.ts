import { config } from "./env.js";

export interface OpenAIConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  organization: string | undefined;
}

export interface AIConfig {
  provider: "openai" | "anthropic" | "google";
  openai: OpenAIConfig | undefined;
  defaultParams: {
    temperature: number;
    maxTokens: number;
  };
}

// Since there are no AI keys in env.ts, return undefined
function getOpenAIConfig(): OpenAIConfig | undefined {
  // Check if OPENAI_API_KEY exists (it doesn't in current env.ts)
  // Return undefined since we don't have AI keys
  return undefined;
}

export const aiConfig: AIConfig = {
  provider: "openai",
  openai: getOpenAIConfig(),
  defaultParams: {
    temperature: 0.3,
    maxTokens: 2000,
  },
};

// Provider-specific validation
export function validateAIConfig(): void {
  const { provider } = aiConfig;

  switch (provider) {
    case "openai":
      if (!aiConfig.openai) {
        console.warn(
          "OpenAI configuration is incomplete. AI features will not work.",
        );
      }
      break;
    default:
      console.warn(`Unsupported AI provider: ${provider}`);
  }
}

// Get active AI config based on provider
export function getActiveAIConfig(): OpenAIConfig | undefined {
  const { provider } = aiConfig;

  switch (provider) {
    case "openai":
      return aiConfig.openai;
    default:
      return undefined;
  }
}
