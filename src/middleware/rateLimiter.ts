import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

const userRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: {
    error: "Rate limit exceeded. You can only make 20 requests per hour.",
  },
  keyGenerator: (req: Request, _: Response) => {
    return req.user?.id || req.ip || "default-key";
  },
});

export default userRateLimiter;
