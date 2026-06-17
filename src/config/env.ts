import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const envSchema = z.object({
  // Server
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("localhost"),

  // CORS
  CORS_ORIGIN: z.string().optional(),

  // Rate Limiting - General
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),

  // Rate Limiting - Strict (for sensitive operations)
  STRICT_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000), // 1 minute
  STRICT_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(10),

  // Rate Limiting - Light (for read-only operations)
  LIGHT_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000), // 1 minute
  LIGHT_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(60),

  // Rate Limiting - AI (for AI operations)
  AI_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000), // 1 minute
  AI_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(5),

  // Rate Limiting - Upload (for file uploads)
  UPLOAD_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000), // 1 minute
  UPLOAD_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(5),

  // Upload
  MAX_FILE_SIZE_MB: z.coerce.number().default(10),
  UPLOAD_DIR: z.string().default("./uploads"),
});

export type EnvConfig = z.infer<typeof envSchema>;

let cachedConfig: EnvConfig | null = null;

export function validateEnv(): EnvConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const config = envSchema.parse(process.env);
    cachedConfig = config;
    return config;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      throw new Error(
        `Invalid environment variables: ${JSON.stringify(errors, null, 2)}`,
      );
    }
    throw error;
  }
}

export const config = validateEnv();
