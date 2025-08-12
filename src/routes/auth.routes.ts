import { login } from "@controllers/auth.controller";
import { validate } from "@middleware/validator";
import { loginSchema } from "@validations/auth";
import { Router } from "express";

const router = Router();

router.post("/login", validate(loginSchema), login);

export default router;
