import express from "express";
const router = express.Router();

const apiKey = process.env.APIKEY;

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const page_size = req.query.page_size || 12;

  try {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${apiKey}&page=${page}&page_size=${page_size}`);
    if(!response.ok) {
      throw new Error(`Error getting genres`);
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({Error: "Failed fetching Genres"});
  }
})


export default router;