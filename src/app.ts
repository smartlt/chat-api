import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);

export default app;
