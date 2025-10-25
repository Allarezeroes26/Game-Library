let storeMap = {}; 
// Stores all game stores by ID for quick lookup

// Loads all stores and saves them in storeMap
async function loadStores() {
  const res = await fetch("http://localhost:8080/api/stores");
  const data = await res.json();

  // Map each store’s ID to its name and domain
  data.results.forEach(store => {
    storeMap[store.id] = {
      name: store.name,
      domain: store.domain
    };
  });
}

// Fetches and displays stores that sell a specific game
async function getGameStore(id) {
  try {
    const response = await fetch(`/api/games/${id}/stores`);
    if (!response.ok) throw new Error("Error fetching store!");

    const data = await response.json();

    // Handle no stores found
    if (!data.results || data.results.length === 0) {
      const noStoreMsg = document.createElement("p");
      noStoreMsg.textContent = "No stores available for this game.";
      leftSide.appendChild(noStoreMsg);
      return;
    }

    // Create a container for store links
    const storeContainer = document.createElement("div");
    storeContainer.classList.add("store-container");

    // Add each store link using storeMap info
    data.results.forEach(g => {
      const storeInfo = storeMap[g.store_id];
      if (!storeInfo) return;

      const storeLink = document.createElement("a");
      storeLink.href = g.url;
      storeLink.target = "_blank";
      storeLink.textContent = storeInfo.name;
      storeLink.classList.add("store-link");

      storeContainer.appendChild(storeLink);
    });

    leftSide.appendChild(storeContainer);

  } catch (err) {
    console.log(`Error: ${err}`);
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Could not load stores.";
    leftSide.appendChild(errorMsg);
  }
}
