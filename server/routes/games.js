import express from "express";
const router = express.Router();
const apiKey = process.env.APIKEY;

// ── Get list of games with optional filters ──
router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const page_size = req.query.page_size || 12;
  const search = req.query.search || "";
  const platforms = req.query.platforms;
  const genres = req.query.genres;
  const developers = req.query.developers;
  const tags = req.query.tags;

  try {
    let url = `https://api.rawg.io/api/games?page=${page}&page_size=${page_size}&key=${apiKey}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (platforms) url += `&platforms=${encodeURIComponent(platforms)}`;
    if (genres) url += `&genres=${encodeURIComponent(genres)}`;
    if (developers) url += `&developers=${encodeURIComponent(developers)}`;
    if (tags) url += `&tags=${encodeURIComponent(tags)}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error fetching games");
    const games = await response.json();
    res.json(games);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ Error: "Error Fetching Games!" });
  }
});

// ── Get game details by ID ──
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
    const game = await response.json();
    if (game.detail === "Not Found") return res.status(404).json({ error: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch game details" });
  }
});

// ── Get game screenshots ──
router.get("/:id/screenshots", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch screenshots" });
  }
});

// ── Get game trailers ──
router.get("/:id/movies", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}/movies?key=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({ error: "Failed to fetch Trailer" });
  }
});

// ── Get game achievements ──
router.get("/:id/achievements", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}/achievements?key=${apiKey}`);
    if (!response.ok) throw new Error(`RAWG API Error: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
});

// ── Get DLCs or additions ──
router.get("/:id/additions", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}/additions?key=${apiKey}`);
    if (!response.ok) throw new Error(`Error getting dlc's`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({ Error: "DLC's for this game not found!" });
  }
});

// ── Get related game series ──
router.get("/:id/game-series", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}/game-series?key=${apiKey}`);
    if (!response.ok) throw new Error("Error getting Game Series");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({ Error: "Error getting game series" });
  }
});

// ── Get stores where game is available ──
router.get("/:id/stores", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}/stores?key=${apiKey}`);
    if (!response.ok) throw new Error("Error getting stores");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(500).json({ Error: "Error fetching stores" });
  }
});

export default router;
