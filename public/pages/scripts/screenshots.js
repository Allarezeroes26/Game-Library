const rightSide = document.querySelector(".right-side");

//viewing image/screenshot logic

async function getScreenshots(id) {
  try {
    const res = await fetch(`/api/games/${id}/screenshots`);
    if (!res.ok) throw new Error("Could not fetch screenshots");

    const data = await res.json();

    const modal = document.createElement("div");
    modal.classList.add("image-modal");

    const spanClose = document.createElement("span");
    spanClose.classList.add("span-close");
    spanClose.textContent = "❌";

    const modalImg = document.createElement("img");
    modalImg.classList.add("modal-content");

    modal.appendChild(spanClose);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Close modal
    spanClose.onclick = () => modal.style.display = "none";
    modal.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };

    data.results.forEach(g => {
      const img = document.createElement("img");
      img.classList.add("game-screenshots");
      img.src = g.image;
      img.alt = "game-screenshot";

      // Open modal when clicked
      img.onclick = () => {
        modal.style.display = "flex";
        modalImg.src = g.image;
      };

      rightSide.appendChild(img);
    });

    //If theres no screenshot this runs
  } catch (err) {
    console.log(`Error: ${err}`);
    rightSide.textContent = "Screenshots not found";
  }
}
