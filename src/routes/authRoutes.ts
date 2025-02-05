// src/routes/authRoutes.ts
import { Router } from "express";
import { register, login, protectedRoute } from "../controllers/authController";
import isAuthenticated from "../middleware/auth";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route (requires valid JWT)
router.get("/protected", isAuthenticated, protectedRoute);

export default router;
