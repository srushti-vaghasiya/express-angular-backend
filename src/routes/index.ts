import { Router } from "express";
import userRoutes from "@routes/user.routes";
import authRoutes from "@routes/auth.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
