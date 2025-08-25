import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/getChart", async (req, res) => {
  const { date, time, location } = req.body;
  try {
    const response = await fetch("https://api.humandesign.ai/chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HD_API_KEY}`
      },
      body: JSON.stringify({ date, time, location })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Hiba történt az API hívás során." });
  }
});

app.listen(10000, () => {
  console.log("HD proxy API listening on port 10000");
});
