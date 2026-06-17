import type {
  CoverData,
  GenerateCoverLetterRequest,
  GenerateCoverLetterResponse,
  GenerateCoverPdfRequest,
} from "./cover-letter.types.js";

export class CoverLetterService {
  async generateCoverLetter(
    request: GenerateCoverLetterRequest,
  ): Promise<GenerateCoverLetterResponse> {
    throw new Error("generateCoverLetter not implemented");
  }

  async generatePdf(request: GenerateCoverPdfRequest): Promise<Buffer> {
    throw new Error("generatePdf not implemented");
  }
}
