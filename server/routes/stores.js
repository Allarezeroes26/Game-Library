import express from "express";
const router = express.Router();

const apiKey = process.env.APIKEY;

router.get("/", async (req, res) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/stores?key=${apiKey}`);
    if(!response.ok) {
      throw new Error("Error fetching store details");
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({Error: "Error getting store detail"});
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://api.rawg.io/api/stores/${id}?key=${apiKey}`);
    if(!response.ok) {
      throw new Error("Error fetching store details");
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({Error: "Error getting store detail"});
  }
})

export default router;