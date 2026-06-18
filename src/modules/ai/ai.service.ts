import OpenAI from "openai";
import { RESUME_TAILOR_SYSTEM_PROMPT } from "./prompts/resume/systemPrompt.ts";
import { RESUME_OUTPUT_SCHEMA } from "./prompts/resume/resumeOutput.schema.ts";

export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      baseURL: "http://localhost:11434/v1",
      apiKey: "ollama",
    });
  }

  async askForJSON<T>(
    prompt: string,
    options: { model?: string; temperature?: number; maxTokens?: number } = {},
  ): Promise<T> {
    const { model = "llama3.2", temperature = 0.2, maxTokens = 2000 } = options;

    try {
      const response = await this.openai.chat.completions.create({
        model,
        messages: [
          {
            role: "system",
            content:
              RESUME_TAILOR_SYSTEM_PROMPT + "\n\n" + RESUME_OUTPUT_SCHEMA,
          },
          { role: "user", content: prompt },
        ],
        temperature,
        max_tokens: maxTokens,
        response_format: { type: "json_object" },
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error("No response from AI");

      // Clean markdown if present
      const jsonStr = content.replace(/```json\s*/g, "").replace(/```\s*/g, "");
      return JSON.parse(jsonStr) as T;
    } catch (error) {
      throw new Error(
        `AI service error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
}
