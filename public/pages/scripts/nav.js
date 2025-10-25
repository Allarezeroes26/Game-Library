const genreContent = document.querySelector(".genre-content");
const genreBtn = document.querySelector(".genre-dropbtn");
const platformContent = document.querySelector(".platform-content");
const platformBtn = document.querySelector(".platform-dropbtn");

//Getting list of Genres

async function dropGenre(page = 1, page_size = 20) {
  try {
    const res = await fetch(`/api/genres?page=${page}&page_size=${page_size}`);
    if (!res.ok) throw new Error("Could not fetch genres");

    const data = await res.json();
    genreContent.innerHTML = "";

    data.results.forEach(g => {
      const genreLink = document.createElement("a");
      genreLink.classList.add("genre-link");
      genreLink.href = `../main.html?genres=${g.slug}`;
      genreLink.style.backgroundImage = `url(${g.image_background})`;

      const span = document.createElement("span");
      span.textContent = g.name;
      genreLink.appendChild(span);

      genreContent.appendChild(genreLink);
    });

  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

//Getting list of Platform
async function dropPlatform(page = 1, page_size = 20) {
  try {
    const res = await fetch(`/api/platforms?page=${page}&page_size=${page_size}`);
    if (!res.ok) throw new Error("Error fetching platforms");

    const data = await res.json();
    platformContent.innerHTML = "";

    data.results.forEach(p => {
      const platformLink = document.createElement("a");
      platformLink.classList.add("platform-link");
      platformLink.href = `../main.html?platforms=${p.id}`;
      platformLink.style.backgroundImage = `url(${p.image_background})`;

      const span = document.createElement("span");
      span.textContent = p.name;
      platformLink.appendChild(span);

      platformContent.appendChild(platformLink);
    });

  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

// Show dropdown on hover or click
function setupNavbarDropdown(btn, dropdown) {
  let hideTimeout;

  // Show dropdown on hover
  btn.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    dropdown.style.display = "block";
  });

  btn.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      dropdown.style.display = "none";
    }, 400); // longer delay for user movement
  });

  dropdown.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout); // keep open while inside
    dropdown.style.display = "block";
  });

  dropdown.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      dropdown.style.display = "none";
    }, 400);
  });
}

//Calling all functions
dropGenre();
dropPlatform();
setupNavbarDropdown(genreBtn, genreContent);
setupNavbarDropdown(platformBtn, platformContent);
