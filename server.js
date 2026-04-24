import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import developerRoutes from "./routes/developerRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import leetcodeRoutes from "./routes/leetcode.js"; // ✅ NEW

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔥 CORS SETUP
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_ALT,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

const vercelPreviewPattern =
  /^https:\/\/github-analyzer-frontend(?:[-\w]*)?\.vercel\.app$/;

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        vercelPreviewPattern.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// 🔥 MIDDLEWARE
app.use(express.json());

// 🔥 DEBUG
console.log("🔥 THIS SERVER IS RUNNING");

// 🔥 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/dev", developerRoutes);
app.use("/api/github", githubRoutes);

// ✅ NEW LEETCODE ROUTE
app.use("/api/leetcode", leetcodeRoutes);

// 🔥 TEST ROUTE
app.get("/test", (req, res) => {
  res.send("Main server working ✅");
});

// 🔥 DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// 🔥 START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});