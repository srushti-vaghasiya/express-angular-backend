import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "@controllers/user.controller";
import { isAdmin } from "@middleware/adminMiddleware";
import { authenticateJWT } from "@middleware/auth";
import { validate } from "@middleware/validator";
import { createUserSchema, updateUserSchema } from "@validations/user";
import { Router } from "express";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.use(authenticateJWT);
router.put("/:id", validate(updateUserSchema), updateUser);
router.get("/:id", getUserById);

router.use(isAdmin);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

export default router;
