import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL || "mongodb://localhost:27017/chat-api",
      {
        // If needed, pass additional connection options
      }
    );
    console.log("MongoDB connected.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
