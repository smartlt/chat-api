// src/controllers/chatController.ts
import { Request, Response } from "express";
import Conversation from "../models/Conversation";

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, conversationId } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
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

    conversation.messages.push({
      role: "assistant",
      content: aiResponse,
      timestamp: new Date(),
    });

    await conversation.save();

    res.status(200).json({
      message: aiResponse,
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// --- 2. Get chat history ---
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      res.status(404).json({ error: "Conversation not found." });
      return;
    }

    // Ensure this conversation belongs to the requesting user
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

// --- 3. List user’s conversations ---
export const listConversations = async (req: Request, res: Response) => {
  try {
    // Find all conversations for this user
    const conversations = await Conversation.find({ user: req.user?.id })
      .sort({ updatedAt: -1 })
      .select({ messages: { $slice: -1 }, updatedAt: 1 });
    // ^ We'll select only the last message for a preview (and updatedAt).
    // If you want more data, adjust accordingly.

    // Transform the data into a simpler format
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
