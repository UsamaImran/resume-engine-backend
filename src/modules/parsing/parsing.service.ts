import mammoth from "mammoth";
import { ValidationError } from "../shared/errors/app.error.js";

export class ParsingService {
  // ============================
  //  Private Extraction Methods
  // ============================

  private async extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
      // @ts-ignore - Dynamic import to avoid ESM/CJS issues
      const pdfParse = await import("pdf-parse-debugging-disabled");
      const parseFn = (pdfParse as any).default || pdfParse;
      const data = await parseFn(buffer);
      return data.text ? data.text.trim() : "";
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("PDF extraction error:", error);
      throw new Error(`PDF extraction failed: ${message}`);
    }
  }

  private async extractTextFromDOCX(buffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value.trim();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("DOCX extraction error:", error);
      throw new Error(`DOCX extraction failed: ${message}`);
    }
  }

  private async extractText(
    buffer: Buffer,
    fileType: "pdf" | "docx",
  ): Promise<string> {
    if (!buffer || buffer.length === 0) {
      throw new ValidationError("Empty file buffer provided");
    }

    try {
      if (fileType === "pdf") {
        return await this.extractTextFromPDF(buffer);
      }
      if (fileType === "docx") {
        return await this.extractTextFromDOCX(buffer);
      }
      throw new ValidationError(`Unsupported file type: ${fileType}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new ValidationError(
        `Failed to extract text from ${fileType.toUpperCase()}: ${message}`,
      );
    }
  }

  async parseResume(buffer: Buffer, fileType: "pdf" | "docx"): Promise<string> {
    const rawText = await this.extractText(buffer, fileType);
    if (!rawText || rawText.trim().length === 0) {
      throw new ValidationError(
        "No text content found in the uploaded resume file",
      );
    }
    console.log("Resume text extracted successfully.");
    return rawText;
  }

  async parseCoverLetter(
    buffer: Buffer,
    fileType: "pdf" | "docx",
  ): Promise<string> {
    const rawText = await this.extractText(buffer, fileType);
    if (!rawText || rawText.trim().length === 0) {
      throw new ValidationError(
        "No text content found in the uploaded cover letter file",
      );
    }
    console.log("Cover letter text extracted successfully.");
    return rawText;
  }
}
