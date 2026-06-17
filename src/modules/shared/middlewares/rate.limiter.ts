import rateLimit from "express-rate-limit";
import { Request, Response } from "express";
import { config } from "../../../config/env.js";

// Helper to get client IP (works for both IPv4 and IPv6)
const getClientIp = (req: Request): string => {
  // Check for forwarded IPs (when behind a proxy)
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const ips = Array.isArray(forwarded) ? forwarded : forwarded.split(",");
    return ips[0]?.trim() || req.ip || "unknown";
  }
  return req.ip || "unknown";
};

export const rateLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
    statusCode: 429,
  },
  keyGenerator: (req: Request) => {
    const userId = (req as any).userId || "anonymous";
    const ip = getClientIp(req);
    return `${ip}-${userId}`;
  },
  handler: (req: Request, res: Response) => {
    console.warn("Rate limit exceeded", {
      ip: getClientIp(req),
      path: req.path,
      method: req.method,
    });

    res.status(429).json({
      success: false,
      error: "Too many requests, please try again later.",
      statusCode: 429,
      retryAfter: Math.ceil(config.RATE_LIMIT_WINDOW_MS / 1000 / 60),
    });
  },
  skip: (req: Request) => {
    if (req.path === "/health") return true;
    if (req.headers["x-internal-request"]) return true;
    return false;
  },
});

export const strictRateLimiter = rateLimit({
  windowMs: config.STRICT_RATE_LIMIT_WINDOW_MS,
  max: config.STRICT_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests, please slow down.",
    statusCode: 429,
  },
  keyGenerator: (req: Request) => {
    const userId = (req as any).userId || "anonymous";
    const ip = getClientIp(req);
    return `${ip}-${userId}`;
  },
  handler: (req: Request, res: Response) => {
    console.warn("Strict rate limit exceeded", {
      ip: getClientIp(req),
      path: req.path,
      method: req.method,
    });

    res.status(429).json({
      success: false,
      error: "Rate limit exceeded. Please wait before making more requests.",
      statusCode: 429,
    });
  },
});

export const lightRateLimiter = rateLimit({
  windowMs: config.LIGHT_RATE_LIMIT_WINDOW_MS,
  max: config.LIGHT_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
    statusCode: 429,
  },
  keyGenerator: (req: Request) => {
    const userId = (req as any).userId || "anonymous";
    const ip = getClientIp(req);
    return `${ip}-${userId}`;
  },
});

export const aiRateLimiter = rateLimit({
  windowMs: config.AI_RATE_LIMIT_WINDOW_MS,
  max: config.AI_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error:
      "AI service rate limit exceeded. Please wait before making more requests.",
    statusCode: 429,
  },
  keyGenerator: (req: Request) => {
    const userId = (req as any).userId || "anonymous";
    const ip = getClientIp(req);
    return `${ip}-${userId}`;
  },
  handler: (req: Request, res: Response) => {
    console.warn("AI rate limit exceeded", {
      ip: getClientIp(req),
      path: req.path,
      method: req.method,
      userId: (req as any).userId,
    });

    res.status(429).json({
      success: false,
      error:
        "AI service limit reached. Please wait 60 seconds before trying again.",
      statusCode: 429,
      retryAfter: Math.ceil(config.AI_RATE_LIMIT_WINDOW_MS / 1000),
    });
  },
});

export const uploadRateLimiter = rateLimit({
  windowMs: config.UPLOAD_RATE_LIMIT_WINDOW_MS,
  max: config.UPLOAD_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Upload rate limit exceeded. Please try again later.",
    statusCode: 429,
  },
  keyGenerator: (req: Request) => {
    const userId = (req as any).userId || "anonymous";
    const ip = getClientIp(req);
    return `${ip}-${userId}`;
  },
  handler: (req: Request, res: Response) => {
    console.warn("Upload rate limit exceeded", {
      ip: getClientIp(req),
      path: req.path,
      method: req.method,
    });

    res.status(429).json({
      success: false,
      error: "Too many uploads. Please wait a moment before uploading again.",
      statusCode: 429,
    });
  },
});

export const rateLimiters = {
  default: rateLimiter,
  strict: strictRateLimiter,
  light: lightRateLimiter,
  ai: aiRateLimiter,
  upload: uploadRateLimiter,
};
