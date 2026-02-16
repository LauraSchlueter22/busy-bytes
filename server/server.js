import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import aiRoutes from "./routes/aiRoutes.js";
import mongoose from "mongoose";

// I need to come back and reorganize files.
// mainly backend files

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 connected to MongoDB"))
  .catch((err) => console.error("🛑 MongoDB connection error:", err));

app.use("/api/ai", aiRoutes);

app.use((req, res) => res.status(404).send("☹️ This page does not exist"));

app.use((err, req, res, next) => {
  console.error("❌ Express Error Handler:", err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`👂🏼 Server listening on port: ${PORT}.`);
  console.log(
    `🤖 Anthropic API key loaded: ${process.env.ANTHROPIC_API_KEY ? "✅" : "❌"}`,
  );
});

export default app;
