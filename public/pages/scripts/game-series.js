//Getting related games

async function getGameSeries(id) {
  try {
    const res = await fetch(`http://localhost:8080/api/games/${id}/game-series`);
    if (!res.ok) throw new Error("Error getting game series");

    const data = await res.json();

    const section = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = "Related Game Series:";
    title.style.marginBottom = "1.5rem";
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.classList.add("related-contents");

    if(data.results || data.results.length === 0){
      relatedContents.textContent = "No related game series found"
    }

    data.results.forEach((game) => {
      const card = document.createElement("div");
      card.classList.add("game");
      card.dataset.id = game.id;

      const img = document.createElement("img");
      img.src = game.background_image || "https://via.placeholder.com/300x200?text=No+Image";
      img.alt = game.name;

      const info = document.createElement("div");
      info.classList.add("game-info");
      info.textContent = game.name;

      card.appendChild(img);
      card.appendChild(info);
      grid.appendChild(card);
    });

    section.appendChild(grid);

    const related = document.querySelector(".related");
    related.innerHTML = "";
    related.appendChild(section);

  } catch (err) {
    console.log("Error:", err);
  }
}
