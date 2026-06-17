import { App } from "./app.js";
import { config } from "./config/env.js";

async function bootstrap() {
  try {
    const app = new App();
    const server = app.getApp();

    server.listen(config.PORT, () => {
      console.info(`🚀 Server running on port ${config.PORT}`);
      console.info(`📚 Environment: ${config.NODE_ENV}`);
      console.info(`🔗 API URL: http://localhost:${config.PORT}/api/v1`);
      console.info(`📄 Health check: http://localhost:${config.PORT}/health`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.info(`Received ${signal}, shutting down gracefully...`);
      process.exit(0);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();
