import { AIService } from "../ai/ai.service.js";
import { buildResumeTailorPrompt } from "../ai/prompts/resumeTailorPrompt.ts";

import type { ResumeData } from "../resume/resume.types.js";

export interface TailorRequest {
  resume: string;
  jobDescription: string;
  preferences?: {
    tone?: "professional" | "enthusiastic" | "formal";
    keywordEmphasis?: string[];
  };
}

export class TailorService {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async tailorResume(request: TailorRequest): Promise<ResumeData> {
    const { resume, jobDescription, preferences } = request;

    if (!resume || resume.trim().length === 0) {
      throw new Error("Resume text is required");
    }

    if (!jobDescription || jobDescription.trim().length === 0) {
      throw new Error("Job description is required");
    }

    const prompt = buildResumeTailorPrompt(resume, jobDescription, preferences);

    return this.aiService.askForJSON<ResumeData>(prompt, {
      temperature: 0.3,
      maxTokens: 2500,
    });
  }
}
