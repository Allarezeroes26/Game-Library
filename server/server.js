import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import gamesRouter from "./routes/games.js";
import genresRouter from "./routes/genres.js";
import developerRouter from "./routes/developers.js";
import platformRouter from "./routes/platforms.js";
import storeRouter from "./routes/stores.js";
import tagsRouter from "./routes/tags.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static("public"));

// Game data fetched from RAWG.io API (https://rawg.io/)

//Routes

app.use("/api/games", gamesRouter);
app.use(`/api/games/:id`, gamesRouter)
app.use('/api/games/:id/screenshots', gamesRouter)
app.use('/api/games/:id/movies', gamesRouter)
app.use('/api/games/:id/achievements', gamesRouter)
app.use('/api/games/:id/additions', gamesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/platforms', platformRouter);
app.use("/api/developers/:slug", developerRouter);
app.use("/api/games/:id/game-series", gamesRouter);
app.use("/api/games/:id/stores", gamesRouter);
app.use("/api/stores/:id", storeRouter);
app.use("/api/stores", storeRouter);
app.use("/api/tags/:id", tagsRouter);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

