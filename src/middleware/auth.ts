import { AppDataSource } from "@config/data-source";
import { User } from "@entities/User";
import { unauthorized } from "@utils/exceptions";
import { verifyToken } from "@utils/token";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw unauthorized();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const userRepository = AppDataSource.getRepository(User);

    const data = await userRepository.findOneBy({ id: decoded.id });
    if (!data) throw unauthorized();
    req.user = data;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
