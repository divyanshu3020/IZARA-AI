import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

// ✅ Rate Limit Check Function
async function checkRateLimit() {
  try {
    const response = await fetch("https://api.github.com/rate_limit", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      console.error("❌ Failed to fetch rate limit:", response.status);
      return;
    }

    const data = await response.json();
    const { limit, remaining, reset } = data.rate;
    const resetTime = new Date(reset * 1000).toLocaleString();

    console.log("📊 GitHub API Rate Limit Info:");
    console.log(`🔢 Total Limit: ${limit}`);
    console.log(`✅ Remaining: ${remaining}`);
    console.log(`⏳ Resets at: ${resetTime}`);
  } catch (error) {
    console.error("❌ Error fetching rate limit:", error.message);
  }
}

app.post("/query/res", async (req, res) => {
  await checkRateLimit(); // ✅ Log rate limit before request

  const { question: q } = req.body;

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: q },
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model,
    });

    console.log("🔈 Response:", response.choices[0].message.content);
    res.json(response.choices[0].message.content);
  } catch (error) {
    console.error("❌ LLM Error:", error);
    res.status(500).json({ error: "Something went wrong with LLM API" });
  }
});

app.listen(3000, async () => {
  console.log("🚀 Server running on http://localhost:3000");
  await checkRateLimit(); // ✅ Log rate limit on startup
});
