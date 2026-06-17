import {
  ResumeData,
  TailorResumeRequest,
  TailorResumeResponse,
  GenerateResumePdfRequest,
} from "./resume.types.ts";

export class ResumeService {
  async parseResume(
    fileBuffer: Buffer,
    fileType: "pdf" | "docx",
  ): Promise<ResumeData> {
    throw new Error("parseResume not implemented");
  }

  async tailorResume(
    request: TailorResumeRequest,
  ): Promise<TailorResumeResponse> {
    // TODO: Implement AI tailoring
    throw new Error("tailorResume not implemented");
  }

  async generatePdf(request: GenerateResumePdfRequest): Promise<Buffer> {
    // TODO: Use Puppeteer + EJS (from resume-generator repo)
    throw new Error("generatePdf not implemented");
  }
}
