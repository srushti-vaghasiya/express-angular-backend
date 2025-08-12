import { AppDataSource } from "@config/data-source";
import { Role, User } from "@entities/User";
import { internalServerError, notFound } from "@utils/exceptions";
import { deleteProfileImage, uploadProfileImage } from "@utils/file";
import { paginate } from "@utils/pagination";
import { validateProfileImage } from "@validations/file";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const { page = "1", limit = "10" } = req.query;
  const pageValue = parseInt(page as string);
  const limitValue = parseInt(limit as string);
  const queryBuilder = userRepository
    .createQueryBuilder("user")
    .orderBy("user.createdAt", "DESC");

  const data = await paginate(queryBuilder, pageValue, limitValue);
  res.json({ data });
};

export const getUserById = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const data = await userRepository.findOneBy({ id: req.params.id });
  if (!data) throw notFound("User");
  res.json({ data });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save({
      ...payload,
      password: await bcrypt.hash(payload.password, 10),
    });
    const data = await userRepository.findOneBy({ email: payload.email });
    res.json({ data });
  } catch (err: any) {
    throw internalServerError(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const id = req.user!.role === Role.ADMIN ? req.params.id : req.user!.id;
    const user = await userRepository.findOneBy({ id });
    if (!user) throw notFound("User");

    if (req.files && req.files.profile) {
      validateProfileImage(req.files.profile as UploadedFile);
      if (user.profile) deleteProfileImage(user.profile);
      user.profile = uploadProfileImage(req.files.profile as any);
    }

    Object.assign(user, req.body);
    await userRepository.save(user);
    const data = await userRepository.findOneBy({ id });
    res.json({ data });
  } catch (err: any) {
    throw internalServerError(err);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: req.params.id });
  if (!user) throw notFound("User");

  if (user.profile) deleteProfileImage(user.profile);

  await userRepository.remove(user);
  res.json({ message: "User deleted successfully" });
};
