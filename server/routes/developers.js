import express from "express";
const router = express.Router();

const apiKey = process.env.APIKEY;

//gets parameter slug
router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;
  try {
    const response = await fetch(`https://api.rawg.io/api/developers/${slug}?key=${apiKey}`);
    if (!response.ok) {
      throw new Error("Error fetching developer");
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "Error getting developer details" });
  }
})

export default router;