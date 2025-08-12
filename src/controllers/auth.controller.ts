import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "@config/data-source";
import { User } from "@entities/User";
import { createToken } from "@utils/token";
import { internalServerError, notFound, notMatch } from "@utils/exceptions";

export const login = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const { email, password } = req.body;
    const user = await userRepository.findOne({
      where: { email },
      select: [
        "id",
        "firstName",
        "lastName",
        "password",
        "email",
        "mobile",
        "profile",
        "role",
      ],
    });
    if (!user) throw notFound("Email with this password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw notMatch();

    const token = createToken({ email, id: user.id });
    const { password: userPassword, ...data } = user;
    return res.json({ token, data });
  } catch (error: any) {
    throw internalServerError(error);
  }
};
