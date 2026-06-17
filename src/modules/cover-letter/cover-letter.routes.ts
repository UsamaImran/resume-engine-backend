import { Router } from "express";
import { CoverLetterController } from "./cover-letter.controller.js";
import {
  aiRateLimiter,
  rateLimiter,
} from "../shared/middlewares/rate.limiter.js";

export function setupCoverLetterRoutes(router: Router): void {
  const controller = new CoverLetterController();

  const coverRouter = Router();

  coverRouter.post("/generate", aiRateLimiter, controller.generateCoverLetter);

  coverRouter.post("/generate-pdf", rateLimiter, controller.generatePdf);

  router.use("/cover-letter", coverRouter);
}
