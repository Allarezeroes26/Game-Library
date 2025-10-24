//Geting DLC's details

async function getdlcs(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/games/${id}/additions`);
    if(!response.ok) {
      throw new Error("Failed fetching dlcs");
    }
    const data = await response.json();

    const dlcContainer = document.createElement("div");
    dlcContainer.classList.add("dlc-container");
    dlcContainer.style.display = "flex";
    dlcContainer.style.flexDirection = "column";

    if(!data.results || data.results.length === 0){
      dlcContainer.textContent = `Additions to the game not found!`;
      return;
    }
    const dlcTitle = document.createElement("h1");
    dlcTitle.textContent = `Related Games/DLC: `;
    dlcTitle.classList.add("dlc-title");
    dlcTitle.style.marginTop = "2rem";
    dlcTitle.style.marginBottom = "2rem";

    dlcContainer.appendChild(dlcTitle);
    contents.appendChild(bottomDiv);

    data.results.forEach((d, i) => {
      const dlcLink = document.createElement("a");
      dlcLink.classList.add("dlc-link");
      dlcLink.href = `?id=${d.id}`;
      dlcLink.style.color = "white";
      dlcLink.style.textDecoration = "none";
      dlcLink.style.marginBottom = "0.3rem";
      dlcLink.style.marginTop = "0.3rem";
      dlcLink.textContent = `${i + 1}. ${d.name}`;
      dlcContainer.appendChild(dlcLink);
    })

    contents.appendChild(dlcContainer);
  } catch (error) {
    console.log(`Error ${error}`);
  }
}
