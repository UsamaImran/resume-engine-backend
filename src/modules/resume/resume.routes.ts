import { Router } from "express";
import { ResumeController } from "./resume.controller.js";
import {
  uploadRateLimiter,
  aiRateLimiter,
  rateLimiter,
} from "../shared/middlewares/rate.limiter.js";
import { upload } from "../shared/middlewares/upload.middleware.ts";

export function setupResumeRoutes(router: Router): void {
  const controller = new ResumeController();

  const resumeRouter = Router();

  resumeRouter.post(
    "/parse",
    uploadRateLimiter,
    upload.single("resume"),
    controller.parseResume,
  );

  resumeRouter.post("/tailor", aiRateLimiter, controller.tailorResume);

  resumeRouter.post("/generate", rateLimiter, controller.generatePdf);

  router.use("/resume", resumeRouter);
}
