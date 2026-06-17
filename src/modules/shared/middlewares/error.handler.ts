import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { MulterError } from "multer";
import {
  AppError,
  NotFoundError,
  ValidationError,
} from "../errors/app.error.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // Log error
  console.error(err.message, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Handle known errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      statusCode: err.statusCode,
      code: err.errorCode,
      ...(err.details && { details: err.details }),
    });
    return;
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const validationError = new ValidationError(
      "Validation failed",
      err.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    );
    res.status(400).json({
      success: false,
      error: validationError.message,
      statusCode: 400,
      code: "VALIDATION_ERROR",
      details: validationError.details,
    });
    return;
  }

  // Handle Multer errors
  if (err instanceof MulterError) {
    res.status(400).json({
      success: false,
      error: err.message,
      statusCode: 400,
      code: "FILE_ERROR",
    });
    return;
  }

  // Unknown errors
  const isDev = process.env.NODE_ENV === "development";
  res.status(500).json({
    success: false,
    error: isDev ? err.message : "Internal server error",
    statusCode: 500,
    ...(isDev && { stack: err.stack }),
  });
}

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const error = new NotFoundError(`Route ${req.method} ${req.path} not found`);
  next(error);
}
