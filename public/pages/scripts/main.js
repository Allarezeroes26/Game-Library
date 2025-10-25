
const gameDetailContainer = document.querySelector(".game-details");
const heroSection = document.querySelector(".hero-section");
const leftSide = document.querySelector(".left-side");
const contents = document.querySelector(".contents");
const relatedContents = document.querySelector(".related");
const tags = document.querySelector(".tags");
const dynamicImageUrl = "https://placehold.co/1200x800";

const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");


const bottomDiv = document.createElement("div");
bottomDiv.classList.add("bottom-div");

//Getting game details (Background Image, Game Name, Game Description, Game Released Date, Ratings, Devs, Genres, Platform)

async function gameDetail(id) {
  try {
    const res = await fetch(`/api/games/${id}`);
    if(!res.ok) {
      throw new Error("Could not fetch game");
    }
    const game = await res.json();

    const backgroundImage = document.createElement("img");
    backgroundImage.classList.add('background-img');
    backgroundImage.src = game.background_image || dynamicImageUrl;
    backgroundImage.alt = game.name;
    heroSection.style.backgroundImage = `url(${game.background_image_additional || 'https://placehold.co/1200x800'})`;

    const title = document.createElement("h1");
    title.classList.add("game-title");
    title.textContent = game.name;

    const gameDesc = document.createElement("p");
    gameDesc.classList.add("game-desc");
    gameDesc.textContent = game.description_raw || "no description available";

    const released = document.createElement("p")
    released.classList.add("game-released");
    released.textContent = `Released Date: ${game.released}`;

    const rating = document.createElement("p");
    rating.classList.add("game-rating");
    rating.textContent = `Game Rating: ⭐ ${game.rating}/${game.rating_top}`;

    const ratingTop = document.createElement("p");
    ratingTop.classList.add("Game-Rating-Top");
    ratingTop.textContent = `Game Rating Top: ${game.rating_top}`;

    const gameDeveloper = document.createElement("p");
    gameDeveloper.classList.add("game-developer");
    gameDeveloper.textContent = `Developer: `;

    if (game.developers?.length > 0) {
      game.developers.forEach(g => {
        const developerLink = document.createElement("a");
        developerLink.classList.add("developer-link");
        developerLink.href = `../main.html?developers=${g.slug}`;
        developerLink.textContent = `${g.name}`;
        developerLink.style.marginRight = "8px";
        developerLink.style.cursor = "pointer";
        developerLink.style.color = "white";

        gameDeveloper.appendChild(developerLink);
      })
    }

    const genres = document.createElement("p");
    genres.classList.add("game-genres");
    genres.textContent = `Genres: `;

    if (game.genres?.length > 0) {
      game.genres.forEach((g) => {
        const genreLink = document.createElement("a");
        // Use slug or id for filtering in index.html
        genreLink.href = `../main.html?genres=${g.slug}`;
        genreLink.classList.add("genre-link");
        genreLink.textContent = g.name;
        genreLink.style.marginRight = "8px";
        genreLink.style.cursor = "pointer";
        genreLink.style.color = "white";
        genres.appendChild(genreLink);
      });
    }


    const platforms = document.createElement("p");
    platforms.classList.add("game-platforms");
    platforms.textContent = `Platforms: `;

    if (game.platforms?.length>0){
      game.platforms.forEach((p) => {
        const platformLink = document.createElement("a");
        platformLink.classList.add("platform-link");
        platformLink.href = `../main.html?platforms=${p.platform.id}`;
        platformLink.textContent = p.platform.name;
        platformLink.style.marginRight = "8px";
        platformLink.style.cursor = "pointer";
        platforms.appendChild(platformLink);
      })
    }

    const titleTags = document.createElement("h1");
    titleTags.textContent = "Tags";

    tags.appendChild(titleTags);

    const gameTags = document.createElement("div");
    gameTags.classList.add("game-tags");

    if (game.tags?.length > 0) {
      game.tags.forEach(g => {
        const tagLink = document.createElement("a");
        tagLink.classList.add("tag-link");
        tagLink.href = `../main.html?tags=${g.id}`;
        tagLink.textContent = `${g.name}`;
        tagLink.style.color = "white";
        gameTags.appendChild(tagLink);
      })
    }

    const playTime = document.createElement("p");
    playTime.classList.add("game-playTime");
    playTime.textContent = `Average Playtime: ${game.playtime} hrs`;
    
    const trailersSection = document.createElement("div");
    trailersSection.classList.add("trailers-section");

    gameDesc.style.marginBottom = "3rem";

    const h1ti = document.createElement("h1");
    h1ti.style.marginBottom = "1rem"
    h1ti.textContent = "About";
    contents.appendChild(h1ti);
    contents.appendChild(gameDesc);
    contents.appendChild(trailersSection)

    leftSide.appendChild(title);
    leftSide.appendChild(released);
    leftSide.appendChild(rating);
    leftSide.appendChild(ratingTop);
    leftSide.appendChild(playTime);
    leftSide.appendChild(gameDeveloper);
    leftSide.appendChild(genres);
    leftSide.appendChild(platforms);

    tags.appendChild(gameTags)

    getScreenshots(id);
    getGameTrailers(id, trailersSection);
    getGameAchievements(id);
    getdlcs(id);
    getGameSeries(id);
    getGameStore(id);
  } catch (err) {
    console.log(`Error: ${err}`);
    heroSection.textContent = "Game not found";
  }
}


document.addEventListener("click", (e) => {
  const card = e.target.closest(".game");
  if (!card) return;
  const id = card.dataset.id;
  window.location.href = `?id=${id}`;
});

//Calling all function if game ID exists

if (gameId) {
  //This is from the store.js
  loadStores().then(() => {
    gameDetail(gameId);
    dropGenre();
    dropPlatform();
  });
} else {
  gameDetailContainer.textContent = "No game selected.";
}


