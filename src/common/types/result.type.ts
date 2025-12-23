// src/common/types/result.type.ts
import e from "express";

export type Failed = {
  type: "failed";
  message: string;
  errorCode: string;
  statusCode: number;
};

export type Success<T> = {
  type: "success";
  data: T;
  statusCode: number;
};

export type Result<T> = Success<T> | Failed;

export const isSuccess = <T>(r: Result<T>): r is Success<T> => r.type === "success";

export const success = <T>(data: T, statusCode: number = 200): Success<T> => ({
  type: "success",
  data,
  statusCode,
});

export const failed = (
  message: string,
  errorCode: string,
  statusCode: number = 400
): Failed => ({
  type: "failed",
  message,
  errorCode,
  statusCode,
});

// success helpers
export const ok = <T>(data: T): Success<T> => success(data, 200);

export const created = <T>(data: T): Success<T> => success(data, 201);

export const noContent = (): Success<null> => success(null, 204);

// error helpers
export const badRequest = (message: string, errorCode: string = "ERR_400") => 
    failed(message, errorCode, 400);

export const unauthorized = (message: string = "인증이 필요합니다.", errorCode: string = "ERR_401") => 
    failed(message, errorCode, 401);

export const forbidden = (message: string = "접근 권한이 없습니다.", errorCode: string = "ERR_403") => 
    failed(message, errorCode, 403);

export const notFound = (message: string, errorCode: string = "ERR_404") => 
    failed(message, errorCode, 404);

export const conflict = (message: string, errorCode: string = "ERR_409") => 
    failed(message, errorCode, 409);

export const internalServerError = (message: string = "서버 내부 오류가 발생했습니다.", errorCode: string = "ERR_500") => 
    failed(message, errorCode, 500);

// Error Interfaces
/**
 * 400 에러
 * @example {
 * "type": "failed",
 * "message": "입력값이 올바르지 않습니다.",
 * "errorCode": "VAL_001",
 * "statusCode": 400
 * }
 */
export interface BadRequestError extends Failed{
  statusCode: 400;
  errorCode: string;
  message: string;
  type: "failed";
}

/**
 * 401 에러
 * @example {
 * "type": "failed",
 * "message": "인증이 필요합니다.",
 * "errorCode": "ERR_401",
 * "statusCode": 401
 * }
 */
export interface UnauthorizedError extends Failed {
  statusCode: 401;
}

/**
 * 403 에러
 * @example {
 * "type": "failed",
 * "message": "접근 권한이 없습니다.",
 * "errorCode": "ERR_403",
 * "statusCode": 403
 * }
 */
export interface ForbiddenError extends Failed {
  statusCode: 403;
}

/**
 * 404 에러
 * @example {
 * "type": "failed",
 * "message": "요청하신 리소스를 찾을 수 없습니다.",
 * "errorCode": "ERR_404",
 * "statusCode": 404
 * }
 */
export interface NotFoundError extends Failed {
  statusCode: 404;
}

/**
 * 409 에러
 * @example {
 * "type": "failed",
 * "message": "이미 존재하는 이메일입니다.",
 * "errorCode": "USR_001",
 * "statusCode": 409
 * }
 */
export interface ConflictError extends Failed {
  statusCode: 409;
}

/**
 * 500 에러
 * @example {
 * "type": "failed",
 * "message": "서버 내부 오류가 발생했습니다.",
 * "errorCode": "ERR_500",
 * "statusCode": 500
 * }
 */
export interface InternalServerError extends Failed {
  statusCode: 500;
}