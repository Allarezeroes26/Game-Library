import express from "express";
const router = express.Router();

const apiKey = process.env.APIKEY;

router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const page_size = req.query.page_size || 12;

  try {
    const response = await fetch(`https://api.rawg.io/api/platforms?page=${page}&page_size=${page_size}&key=${apiKey}`);
    if(!response.ok){
      throw new Error(`Error getting Platforms`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({Error: `Error getting platforms`});
  }
})


export default router;