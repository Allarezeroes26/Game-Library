// Getting game trailers
async function getGameTrailers(id, trailersSection) {
  try {
    const res = await fetch(`http://localhost:8080/api/games/${id}/movies`);
    if (!res.ok) {
      throw new Error("Could not fetch game trailer");
    }
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      trailersSection.textContent = "No trailers available.";
      return;
    }

    trailersSection.innerHTML = "";

    let currentIndex = 0;

    const trailerWrapper = document.createElement("div");
    trailerWrapper.classList.add("trailer-slideshow");

    const trailerName = document.createElement("p");
    trailerName.classList.add("trailer-name");

    const previewImg = document.createElement("img");
    previewImg.classList.add("preview-trailer");

    const vid = document.createElement("video");
    vid.controls = true;
    vid.width = 640;
    vid.style.display = "none";

    const source = document.createElement("source");
    vid.appendChild(source);

    trailerWrapper.appendChild(trailerName);
    trailerWrapper.appendChild(previewImg);
    trailerWrapper.appendChild(vid);

    // Controls
    const controls = document.createElement("div");
    controls.classList.add("trailer-controls");

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "◀";
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "▶";

    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);

    contents.appendChild(trailerWrapper);
    contents.appendChild(controls);

    // Function to load trailer
    function loadTrailer(index) {
      const g = data.results[index];
      trailerName.textContent = g.name;

      // Reset to preview
      previewImg.src = g.preview;
      previewImg.style.display = "block";
      vid.style.display = "none";
      vid.pause();

      // Set video source
      source.src = g.data.max;
      vid.load();
    }

    // Click preview → play video
    previewImg.addEventListener("click", () => {
      previewImg.style.display = "none";
      vid.style.display = "block";
      vid.play();
    });

    // Navigation
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + data.results.length) % data.results.length;
      loadTrailer(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % data.results.length;
      loadTrailer(currentIndex);
    });

    // Load first trailer
    loadTrailer(currentIndex);

  } catch (err) {
    console.error(`Error: ${err}`);
    contents.textContent = "Trailers not found";
  }
}
