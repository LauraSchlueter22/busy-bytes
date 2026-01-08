import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import apiRouter from "./routes/api.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🟢 connected to MongoDB"))
  .catch((err) => console.error("🛑 MongoDB connection error:", err));

app.use(express.static(path.resolve(__dirname, "../client")));

app.use("/api", apiRouter);

app.use((req, res) => res.status(404).send("☹️ This page does not exist"));

app.use((err, req, res, next) => {
  console.error("❌ Express Error Handler:", err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`👂🏼 Server listening on port: ${PORT}.`);
});

console.log(
  `🫶🏼 API key loaded:`,
  process.env.SPOONACULAR_API_KEY ? "yes" : "No"
);

export default app;
