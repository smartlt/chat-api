import { Router } from "express";
import isAuthenticated from "../middleware/auth";
import userRateLimiter from "../middleware/rateLimiter";
import {
  sendMessage,
  getChatHistory,
  listConversations,
} from "../controllers/chatController";

const router = Router();

router.post("/chat", isAuthenticated, userRateLimiter, sendMessage);
router.get(
  "/chat/:conversationId",
  isAuthenticated,
  userRateLimiter,
  getChatHistory
);
router.get(
  "/conversations",
  isAuthenticated,
  userRateLimiter,
  listConversations
);

export default router;
