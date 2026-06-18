import { Request, Response, NextFunction } from "express";
import { ResumeService } from "./resume.service.js";
import { ValidationError } from "../shared/errors/app.error.js";

export class ResumeController {
  private resumeService: ResumeService;

  constructor() {
    this.resumeService = new ResumeService();
  }

  parseResume = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const file = (req as any).file;
      if (!file) {
        throw new ValidationError("No file uploaded");
      }

      // Determine file type from mimetype or extension
      const fileType = file.mimetype.includes("pdf") ? "pdf" : "docx";
      const buffer = file.buffer;

      const resumeData = await this.resumeService.parseResume(buffer, fileType);

      res.status(200).json({
        success: true,
        data: { resume: resumeData },
      });
    } catch (error) {
      next(error);
    }
  };

  tailorResume = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { resume, jobDescription, preferences } = req.body;

      if (!resume || !jobDescription) {
        throw new ValidationError("resume and jobDescription are required");
      }

      const result = await this.resumeService.tailorResume({
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
      const { resume, template = "modern", outputType = "resume" } = req.body;

      if (!resume) {
        throw new ValidationError("resume data is required");
      }

      const pdfBuffer = await this.resumeService.generatePdf({
        resume,
        template,
        outputType,
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${outputType}.pdf"`,
      );
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  };
}
