import type { ModelDefinitionConfig } from "../config/types.models.js";

/** Cerebras Inference API — OpenAI-compatible chat completions. Free tier available. */
export const CEREBRAS_BASE_URL = "https://api.cerebras.ai/v1";

/** Free-tier cost (Cerebras offers a free tier with rate limits). */
const CEREBRAS_FREE_COST = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

export const CEREBRAS_MODEL_CATALOG: ModelDefinitionConfig[] = [
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    reasoning: false,
    input: ["text"],
    cost: CEREBRAS_FREE_COST,
    contextWindow: 131072,
    maxTokens: 16384,
  },
  {
    id: "llama3.1-8b",
    name: "Llama 3.1 8B",
    reasoning: false,
    input: ["text"],
    cost: CEREBRAS_FREE_COST,
    contextWindow: 8192,
    maxTokens: 8192,
  },
  {
    id: "deepseek-r1-distill-llama-70b",
    name: "DeepSeek R1 Distill Llama 70B",
    reasoning: true,
    input: ["text"],
    cost: CEREBRAS_FREE_COST,
    contextWindow: 131072,
    maxTokens: 16384,
  },
  {
    id: "qwen-3-32b",
    name: "Qwen 3 32B",
    reasoning: true,
    input: ["text"],
    cost: CEREBRAS_FREE_COST,
    contextWindow: 131072,
    maxTokens: 16384,
  },
];

export function buildCerebrasModelDefinition(
  model: (typeof CEREBRAS_MODEL_CATALOG)[number],
): ModelDefinitionConfig {
  return {
    id: model.id,
    name: model.name,
    api: "openai-completions",
    reasoning: model.reasoning,
    input: model.input,
    cost: model.cost,
    contextWindow: model.contextWindow,
    maxTokens: model.maxTokens,
  };
}
