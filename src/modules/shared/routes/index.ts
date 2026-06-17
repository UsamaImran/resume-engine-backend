import { Router, Application } from "express";
import { setupResumeRoutes } from "../../resume/resume.routes.js";
import { setupCoverLetterRoutes } from "../../cover-letter/cover-letter.routes.ts";

export function setupRoutes(app: Application): void {
  const router = Router();

  // API v1 routes
  const apiRouter = Router();

  // Setup entity routes
  setupResumeRoutes(apiRouter);
  setupCoverLetterRoutes(apiRouter);

  // Mount API routes
  router.use("/api/v1", apiRouter);

  // Mount router on app
  app.use("/", router);
}
