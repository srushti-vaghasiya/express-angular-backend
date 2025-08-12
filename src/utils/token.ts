import { User } from "@entities/User";
import jwt from "jsonwebtoken";

export const createToken = (payload: Pick<User, "email" | "id">) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!);
  return token;
};

export const verifyToken = (token: string): Pick<User, "email" | "id"> => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded as Pick<User, "email" | "id">;
};
