import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { json, urlencoded } from "express";
import { rateLimiter } from "./modules/shared/middlewares/rate.limiter.js";
import { errorHandler } from "./modules/shared/middlewares/error.handler.js";
import { setupRoutes } from "./modules/shared/routes/index.js";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddlewares(): void {
    // Security
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
      }),
    );

    this.app.use(
      cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
      }),
    );

    // Performance
    this.app.use(compression());

    // Body parsing
    this.app.use(json({ limit: "50mb" }));
    this.app.use(urlencoded({ extended: true, limit: "50mb" }));

    // Rate limiting
    this.app.use(rateLimiter);

    // Request logging
    this.app.use((req, res, next) => {
      console.info(`${req.method} ${req.path} - ${req.ip}`);
      next();
    });
  }

  private setupRoutes(): void {
    // Health check
    this.app.get("/health", (req, res) => {
      res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
      });
    });

    // API routes
    setupRoutes(this.app);
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public getApp(): express.Application {
    return this.app;
  }
}
