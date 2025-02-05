import { Router } from "express";
import { register, login, protectedRoute } from "../controllers/authController";
import isAuthenticated from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/protected", isAuthenticated, protectedRoute);

export default router;
