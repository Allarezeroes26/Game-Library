// ==== DOM Elements ====
const gameContainer = document.querySelector(".game-collection");
const gameSort = document.querySelector(".gameSort");

// ==== URL Params (Filters) ====
const params = new URLSearchParams(window.location.search);
let currentSearch = params.get("search") || "";
let currentPage = 1;
let currentGenre = params.get("genres") || "";
let currentPlatform = params.get("platforms") || "";
let currentDeveloper = params.get("developers") || "";
let currentTags = params.get("tags") || "";

// ==== Fetch and Render Games ====
async function fetchGame(
  page = 1,
  page_size = 12,
  search = "",
  platforms = "",
  genre = "",
  developers = "",
  tags = ""
) {
  try {
    // Build API URL
    let url = `/api/games?page=${page}&page_size=${page_size}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (genre) url += `&genres=${encodeURIComponent(genre)}`;
    if (platforms) url += `&platforms=${encodeURIComponent(platforms)}`;
    if (developers) url += `&developers=${encodeURIComponent(developers)}`;
    if (tags) url += `&tags=${encodeURIComponent(tags)}`;

    // Fetch data from API
    const res = await fetch(url);
    if (!res.ok) throw new Error("Could not fetch games!");
    const data = await res.json();

    console.log("API Response:", data);

    // Clear container
    gameContainer.innerHTML = "";

    // Handle no results
    if (!data.results || data.results.length === 0) {
      gameContainer.innerHTML = "<p>No Games found</p>";
      return;
    }

    // ==== Title Setup ====
    gameSort.innerHTML = "";
    const gamingSort = document.createElement("h1");
    gameSort.appendChild(gamingSort);

    // ---- Helper: Generate Page Title ----
    async function setGamingSort({ platforms, genre, developers, tags }, data) {
      let title = "Top Searches";

      try {
        // Set title for platform filter
        if (platforms) {
          const platformName =
            data.results[0]?.platforms?.find(p => p.platform.id == platforms)?.platform.name || platforms;
          title = `${platformName} Games`;

        // Set title for genre filter
        } else if (genre) {
          const genreName =
            data.results[0]?.genres?.find(g => g.slug == genre)?.name || genre;
          title = `${genreName} Games`;

        // Set title for developer filter
        } else if (developers) {
          let devName = null;
          try {
            const res = await fetch(`http://localhost:8080/api/developers/${developers}`);
            if (res.ok) {
              const devData = await res.json();
              devName = devData.name;
            }
          } catch (err) {
            console.error("Developer fetch failed:", err);
          }
          title = `${devName || developers} Games`;

        // Set title for tag filter
        } else if (tags) {
          let tagName =
            data.results[0]?.tags?.find(t => t.id == tags || t.slug === tags)?.name || null;

          if (!tagName) {
            try {
              const res = await fetch(`http://localhost:8080/api/tags/${tags}`);
              if (res.ok) {
                const tagData = await res.json();
                tagName = tagData.name;
              }
            } catch (err) {
              console.error("Tag fetch failed:", err);
            }
          }

          title = `${tagName || tags} Games`;
        }
      } catch (err) {
        console.error("Error setting title:", err);
      }

      return title;
    }

    // Apply title
    gamingSort.textContent = await setGamingSort(
      { platforms, genre, developers, tags },
      data
    );

    // ==== Render Game Cards ====
    data.results.forEach((game) => {
      const gameCard = document.createElement("div");
      gameCard.classList.add("game");
      gameCard.dataset.id = game.id;

      const gameContent = document.createElement("div");
      gameContent.classList.add("game-content");

      // Image
      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("game-image");
      const img = document.createElement("img");
      img.src = game.background_image || "https://via.placeholder.com/300x150?text=No+Image";
      img.alt = game.name;
      imgWrapper.appendChild(img);

      // Info
      const title = document.createElement("h2");
      title.textContent = `${game.name} (${game.released || "N/A"})`;

      const genreEl = document.createElement("p");
      genreEl.textContent = game.genres?.map((g) => g.name).join(", ") || "No genres";

      const platformsEl = document.createElement("p");
      platformsEl.textContent =
        game.platforms?.map((g) => g.platform.name).join(", ") || "No Platforms available";

      const rating = document.createElement("p");
      rating.textContent = `${game.rating} ⭐`;

      // Append elements
      gameContent.append(imgWrapper, title, genreEl, platformsEl, rating);
      gameCard.appendChild(gameContent);
      gameContainer.appendChild(gameCard);
    });

    // Pagination state
    prevBtn.disabled = !data.previous;
    nextBtn.disabled = !data.next;

  } catch (error) {
    console.error(error);
    gameContainer.innerHTML = "<p>Failed fetching games.</p>";
  }
}

// ==== Event: Game Click (opens new tab) ====
gameContainer.addEventListener("click", (e) => {
  const card = e.target.closest(".game");
  if (!card) return;
  const id = card.dataset.id;
  window.open(`pages/game-select.html?id=${id}`, "_blank");
});

// ==== Initial Load ====
fetchGame(currentPage, 9, currentSearch, currentPlatform, currentGenre, currentDeveloper, currentTags);
dropGenre();
dropPlatform();
