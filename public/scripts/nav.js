const genreContent = document.querySelector(".genre-content");
const genreBtn = document.querySelector(".genre-dropbtn");
const platformContent = document.querySelector(".platform-content");
const platformBtn = document.querySelector(".platform-dropbtn");

// Sets up a dropdown menu for a button (show on hover, hide on leave)
function setupDropdown(btn, dropdown) {
  let timeout;

  function show() {
    const rect = btn.getBoundingClientRect();
    dropdown.style.position = "fixed";
    dropdown.style.top = rect.top + "px";
    dropdown.style.left = rect.right + 10 + "px";
    dropdown.style.display = "flex";
    dropdown.style.flexDirection = "column";
  }

  function hide() {
    dropdown.style.display = "none";
  }

  btn.addEventListener("mouseenter", () => {
    clearTimeout(timeout);
    show();
  });

  dropdown.addEventListener("mouseenter", () => {
    clearTimeout(timeout);
    show();
  });

  btn.addEventListener("mouseleave", () => {
    timeout = setTimeout(hide, 200);
  });

  dropdown.addEventListener("mouseleave", () => {
    timeout = setTimeout(hide, 200);
  });
}

// Apply dropdown setup
setupDropdown(genreBtn, genreContent);
setupDropdown(platformBtn, platformContent);

// Fetches and displays genres inside the genre dropdown
async function dropGenre(page = 1, page_size = 20) {
  try {
    const res = await fetch(`/api/genres?page=${page}&page_size=${page_size}`);
    if (!res.ok) throw new Error("Could not fetch genres");
    const data = await res.json();
    genreContent.innerHTML = "";

    data.results.forEach(g => {
      const genreLink = document.createElement("a");
      genreLink.classList.add("genre-link");
      genreLink.href = "#";
      genreLink.innerHTML = `<span>${g.name}</span>`;
      genreLink.style.backgroundImage = `url(${g.image_background})`;
      genreLink.style.backgroundSize = "cover";
      genreLink.style.backgroundPosition = "center";
      genreLink.style.color = "white";
      genreLink.style.textDecoration = "none";
      genreLink.style.padding = "1rem";
      genreLink.style.display = "block";

      genreLink.addEventListener("click", e => {
        e.preventDefault();
        currentGenre = g.slug;
        currentPage = 1;
        fetchGame(currentPage, 9, currentSearch, currentPlatform, currentGenre);
      });

      genreContent.appendChild(genreLink);
    });
  } catch (err) {
    console.log(err);
  }
}


// Fetches and displays platforms inside the platform dropdown
async function dropPlatform(page = 1, page_size = 20) {
  try {
    const res = await fetch(`/api/platforms?page=${page}&page_size=${page_size}`);
    if (!res.ok) throw new Error("Could not fetch platforms");
    const data = await res.json();
    platformContent.innerHTML = "";

    data.results.forEach(p => {
      const platformLink = document.createElement("a");
      platformLink.classList.add("platform-link");
      platformLink.href = "#";
      platformLink.innerHTML = `<span>${p.name}</span>`;
      platformLink.style.backgroundImage = `url(${p.image_background})`;
      platformLink.style.backgroundSize = "cover";
      platformLink.style.backgroundPosition = "center";
      platformLink.style.color = "white";
      platformLink.style.textDecoration = "none";
      platformLink.style.padding = "1rem";
      platformLink.style.display = "block";

      platformLink.addEventListener("click", e => {
        e.preventDefault();
        currentPlatform = p.id;
        currentPage = 1;
        fetchGame(currentPage, 9, currentSearch, currentPlatform, currentGenre);
      });

      platformContent.appendChild(platformLink);
    });
  } catch (err) {
    console.log(err);
  }
}

// Initialize dropdowns
dropGenre();
dropPlatform();
