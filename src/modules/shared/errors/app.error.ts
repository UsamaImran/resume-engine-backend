import { HttpStatus } from "../constants/http.status.js";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode: string | undefined;
  public readonly details: any | undefined;

  constructor(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true,
    errorCode?: string,
    details?: any,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.BAD_REQUEST, true, "VALIDATION_ERROR", details);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`;
    super(message, HttpStatus.NOT_FOUND, true, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized access") {
    super(message, HttpStatus.UNAUTHORIZED, true, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Access forbidden") {
    super(message, HttpStatus.FORBIDDEN, true, "FORBIDDEN");
    this.name = "ForbiddenError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: any) {
    super(message, HttpStatus.CONFLICT, true, "CONFLICT", details);
    this.name = "ConflictError";
  }
}

export class RateLimitError extends AppError {
  public readonly retryAfter: number | undefined;

  constructor(message: string = "Too many requests", retryAfter?: number) {
    super(message, HttpStatus.TOO_MANY_REQUESTS, true, "RATE_LIMIT");
    this.retryAfter = retryAfter;
    this.name = "RateLimitError";
  }
}

export class AIError extends AppError {
  constructor(message: string, details?: any) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      true,
      "AI_SERVICE_ERROR",
      details,
    );
    this.name = "AIError";
  }
}

export class FileError extends AppError {
  constructor(message: string, details?: any) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      true,
      "FILE_ERROR",
      details,
    );
    this.name = "FileError";
  }
}

export class ParseError extends AppError {
  constructor(message: string, details?: any) {
    super(
      message,
      HttpStatus.UNPROCESSABLE_ENTITY,
      true,
      "PARSE_ERROR",
      details,
    );
    this.name = "ParseError";
  }
}
