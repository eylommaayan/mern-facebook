import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// טעינה מפורשת של ה-.env מתוך תיקיית השרת
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI?.trim();

console.log(
  "Loaded URI starts with:",
  MONGO_URI ? MONGO_URI.substring(0, 15) : "UNDEFINED",
);

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running smoothly!" });
});

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection failed:", err.message));
} else {
  console.error("Error: MONGO_URI is missing or undefined!");
}
