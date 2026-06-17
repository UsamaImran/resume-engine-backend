import { Request, Response, NextFunction } from "express";
import { CoverLetterService } from "./cover-letter.service.js";
import { ValidationError } from "../shared/errors/app.error.js";

export class CoverLetterController {
  private coverLetterService: CoverLetterService;

  constructor() {
    this.coverLetterService = new CoverLetterService();
  }

  generateCoverLetter = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { resume, jobDescription, preferences } = req.body;

      if (!resume) {
        throw new ValidationError("resume data is required");
      }

      if (!jobDescription) {
        throw new ValidationError("jobDescription is required");
      }

      const result = await this.coverLetterService.generateCoverLetter({
        resume,
        jobDescription,
        preferences,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  generatePdf = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { coverLetter, template = "modern" } = req.body;

      if (!coverLetter) {
        throw new ValidationError("coverLetter data is required");
      }

      const pdfBuffer = await this.coverLetterService.generatePdf({
        coverLetter,
        template,
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="cover-letter.pdf"`,
      );
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  };
}
