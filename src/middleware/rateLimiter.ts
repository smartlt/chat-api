// src/middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const userRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 20, // 20 requests per hour
  message: {
    error: "Rate limit exceeded. You can only make 20 requests per hour.",
  },
  keyGenerator: (req: Request, _: Response) => {
    // Use the user’s ID instead of IP address
    // If req.user is undefined, fallback to IP or return a generic string
    return req.user?.id || req.ip || "default-key";
  },
});

export default userRateLimiter;
