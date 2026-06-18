import { ParsingService } from "../parsing/parsing.service.ts";
import { TailorService } from "../tailor/tailor.service.ts";
import {
  ResumeData,
  TailorResumeRequest,
  TailorResumeResponse,
  GenerateResumePdfRequest,
} from "./resume.types.ts";

export class ResumeService {
  private parsingService: ParsingService;
  private tailorService: TailorService;

  constructor() {
    this.parsingService = new ParsingService();
    this.tailorService = new TailorService();
  }

  async parseResume(buffer: Buffer, fileType: "pdf" | "docx"): Promise<string> {
    return this.parsingService.parseResume(buffer, fileType);
  }

  async tailorResume(request: TailorResumeRequest): Promise<ResumeData> {
    const { resume, jobDescription, preferences } = request;

    if (!resume || !jobDescription) {
      throw new Error("rawText and jobDescription are required");
    }

    return this.tailorService.tailorResume({
      resume,
      jobDescription,
    });
  }

  async generatePdf(request: GenerateResumePdfRequest): Promise<Buffer> {
    // TODO: Use Puppeteer + EJS (from resume-generator repo)
    throw new Error("generatePdf not implemented");
  }
}
