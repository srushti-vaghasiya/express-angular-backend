import { Role } from "@entities/User";
import {
  internalServerError,
  permissionDenied,
  unauthorized,
} from "@utils/exceptions";
import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user) {
      throw unauthorized();
    }

    if (user.role !== Role.ADMIN) throw permissionDenied();

    next();
  } catch (error) {
    throw internalServerError(error);
  }
};
