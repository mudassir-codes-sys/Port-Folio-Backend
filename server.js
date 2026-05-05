import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRouter from "./routes/adminRoute.js";
import projectRouter from "./routes/projectRoute.js";
import contactRouter from "./routes/contactRoute.js";
import Groq from "groq-sdk";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const PORTFOLIO_CONTEXT = fs.readFileSync(
  path.join(__dirname, "portfolioContext.txt"),
  "utf-8"
);

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


app.use(cors());

app.use(express.json());

app.use("/admin", adminRouter);

app.use("/project", projectRouter);

app.use("/send", contactRouter);

app.post("/chat", async (req, res) => {
  const { message, history = [] } = req.body
  try {

    if (!message) return res.status(400).send({ message: "Message is required" })

    const messages = [
      { role: "system", content: PORTFOLIO_CONTEXT },
      ...history.map((msg) => ({ role: msg.role, content: msg.content })),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 512,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
    res.status(200).send({ reply });

  } catch (error) {
    console.error("Groq error:", error.message);
    res.status(500).send({ message: "Something went wrong. Please try again." });
  }

})

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

connectDB();

app.listen(port, () => {
  console.log("Server running on ", port);
});
