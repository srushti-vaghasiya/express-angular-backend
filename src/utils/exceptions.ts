import { QueryFailedError } from "typeorm";

export interface ApiError {
  status: number;
  message: string;
}

export const badRequest = (message: string): ApiError => ({
  status: 400,
  message,
});

export const notFound = (entity: string = "Data"): ApiError => ({
  status: 404,
  message: `${entity} not found`,
});

export const unauthorized = (): ApiError => ({
  status: 401,
  message: "User is not authorized",
});

export const forbidden = (message: string): ApiError => ({
  status: 403,
  message,
});

export const conflict = (entity: string = "Data"): ApiError => ({
  status: 409,
  message: `${entity} is already exist`,
});

export const notMatch = (entity: string = "Password"): ApiError => ({
  status: 409,
  message: `${entity} does not matched`,
});

export const permissionDenied = (): ApiError => ({
  status: 403,
  message: `Access denied. Admins only.`,
});

export const internalServerError = (err: any): ApiError => {
  const { status = 500, message = "Internal server error" } = err;
  if (err instanceof QueryFailedError) {
    if ((err as any).code === "23505") {
      const detail = (err as any).detail as string;
      if (detail.includes("(email)")) {
        return {
          status: 500,
          message: "Email already exists",
        };
      }
      if (detail.includes("(mobile)")) {
        return {
          status: 500,
          message: "Mobile number already exists",
        };
      }
      return {
        status: 500,
        message: "Duplicate value",
      };
    }
  }
  return {
    status,
    message,
  };
};
