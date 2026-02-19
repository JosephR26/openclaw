import type { ModelDefinitionConfig } from "../config/types.models.js";

/** Groq Cloud API — OpenAI-compatible chat completions. Free tier available. */
export const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

/** Free-tier cost (Groq offers a generous free tier with rate limits). */
const GROQ_FREE_COST = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

/** Paid-tier cost placeholders (per-million tokens, USD). */
const GROQ_COST_LLAMA_8B = { input: 0.05, output: 0.08, cacheRead: 0.05, cacheWrite: 0.05 };
const GROQ_COST_LLAMA_70B = { input: 0.59, output: 0.79, cacheRead: 0.59, cacheWrite: 0.59 };
const GROQ_COST_MIXTRAL = { input: 0.24, output: 0.24, cacheRead: 0.24, cacheWrite: 0.24 };
const GROQ_COST_GEMMA = { input: 0.2, output: 0.2, cacheRead: 0.2, cacheWrite: 0.2 };
const GROQ_COST_DEEPSEEK = { input: 0.75, output: 0.99, cacheRead: 0.75, cacheWrite: 0.75 };
const GROQ_COST_QWEN = { input: 0.29, output: 0.39, cacheRead: 0.29, cacheWrite: 0.29 };

void GROQ_COST_LLAMA_8B;
void GROQ_COST_LLAMA_70B;
void GROQ_COST_MIXTRAL;
void GROQ_COST_GEMMA;
void GROQ_COST_DEEPSEEK;
void GROQ_COST_QWEN;

export const GROQ_MODEL_CATALOG: ModelDefinitionConfig[] = [
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3 70B Versatile",
    reasoning: false,
    input: ["text"],
    cost: GROQ_FREE_COST,
    contextWindow: 131072,
    maxTokens: 32768,
  },
  {
    id: "llama-3.1-8b-instant",
    name: "Llama 3.1 8B Instant",
    reasoning: false,
    input: ["text"],
    cost: GROQ_FREE_COST,
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout 17B Instruct",
    reasoning: false,
    input: ["text", "image"],
    cost: GROQ_FREE_COST,
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "llama-4-maverick-17b-128e-instruct",
    name: "Llama 4 Maverick 17B Instruct",
    reasoning: false,
    input: ["text", "image"],
    cost: GROQ_FREE_COST,
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "deepseek-r1-distill-llama-70b",
    name: "DeepSeek R1 Distill Llama 70B",
    reasoning: true,
    input: ["text"],
    cost: GROQ_FREE_COST,
    contextWindow: 131072,
    maxTokens: 16384,
  },
  {
    id: "qwen-qwq-32b",
    name: "Qwen QwQ 32B",
    reasoning: true,
    input: ["text"],
    cost: GROQ_FREE_COST,
    contextWindow: 131072,
    maxTokens: 16384,
  },
  {
    id: "gemma2-9b-it",
    name: "Gemma 2 9B",
    reasoning: false,
    input: ["text"],
    cost: GROQ_FREE_COST,
    contextWindow: 8192,
    maxTokens: 8192,
  },
  {
    id: "mixtral-8x7b-32768",
    name: "Mixtral 8x7B",
    reasoning: false,
    input: ["text"],
    cost: GROQ_FREE_COST,
    contextWindow: 32768,
    maxTokens: 32768,
  },
];

export function buildGroqModelDefinition(
  model: (typeof GROQ_MODEL_CATALOG)[number],
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
