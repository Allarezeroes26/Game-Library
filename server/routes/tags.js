import express from "express";
const router = express.Router();

const apiKey = process.env.APIKEY;

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const url = `https://api.rawg.io/api/tags/${id}?key=${apiKey}`;
    console.log("Fetching:", url);

    const response = await fetch(url);
    console.log("RAWG status:", response.status);

    if (!response.ok) {
      const errorText = await response.text(); // capture HTML error message
      console.error("RAWG error response:", errorText);
      return res.status(response.status).json({ error: "RAWG API failed" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Server error fetching tag:", err);
    res.status(500).json({ error: "Error getting tags" });
  }
})

export default router;