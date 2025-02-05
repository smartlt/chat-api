import { Request, Response } from "express";
import Conversation from "../models/Conversation";

import OpenAI from "openai";
import User from "../models/Users";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, conversationId } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).json({ error: "User not found." });
      return;
    }

    if (user.tokens <= 0) {
      res.status(403).json({
        error: "You have no tokens left.",
      });
    }

    let conversation;
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        res.status(404).json({ error: "Conversation not found." });
        return;
      }
      if (conversation.user.toString() !== req.user?.id) {
        res.status(403).json({ error: "Access denied." });
        return;
      }
    } else {
      conversation = await Conversation.create({
        user: req.user?.id,
        messages: [],
      });
    }

    conversation.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      store: true,
    });
    const aiResponse = completion.choices[0].message.content || "";
    const usedTokens = completion.usage?.total_tokens || 0;
    conversation.messages.push({
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    });

    await conversation.save();

    if (usedTokens > 0) {
      user.tokens -= usedTokens;
      await user.save();
    }

    res.status(200).json({
      message: aiResponse,
      conversationId: conversation._id,
      tokenUsed: usedTokens,
      remainingTokens: user.tokens,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Server error." });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      res.status(404).json({ error: "Conversation not found." });
      return;
    }

    if (conversation.user.toString() !== req.user?.id) {
      res.status(403).json({ error: "Access denied." });
      return;
    }

    res.status(200).json({
      conversation: {
        id: conversation._id,
        messages: conversation.messages,
      },
    });
  } catch (error) {
    console.error("Error in getChatHistory:", error);
    res.status(500).json({ error: "Server error." });
  }
};

export const listConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await Conversation.find({ user: req.user?.id })
      .sort({ updatedAt: -1 })
      .select({ messages: { $slice: -1 }, updatedAt: 1 });

    const result = conversations.map((conv) => {
      const lastMsg = conv.messages[conv.messages.length - 1];
      return {
        id: conv._id,
        lastMessage: lastMsg?.content || "",
        updatedAt: conv.updatedAt,
      };
    });

    res.status(200).json({ conversations: result });
  } catch (error) {
    console.error("Error in listConversations:", error);
    res.status(500).json({ error: "Server error." });
  }
};
