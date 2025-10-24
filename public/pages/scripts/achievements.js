//Getting Achiements of Games

async function getGameAchievements(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/games/${id}/achievements`);
    if(!response) {
      throw new Error("Failed fetching achievements");
    }
    const data = await response.json();
    
    const achievementContainer = document.createElement("div");
    achievementContainer.classList.add("achievement-container");

    if (!data.results || data.results.length === 0) {
      achievementContainer.textContent = "No achievements available.";
      return;
    }

    data.results.forEach(a => {
      const achievement = document.createElement("div");
      achievement.classList.add("achievement");

      const achievementName = document.createElement("p");
      achievementName.classList.add("achivement-name");
      achievementName.style.marginBottom = "0.5rem"
      achievementName.textContent = a.name;

      const achievementDesc = document.createElement("p");
      achievementDesc.classList.add("achievement-desc");
      achievementDesc.textContent = a.description;

      const achievementLogo = document.createElement("img");
      achievementLogo.classList.add("achievement-logo");
      achievementLogo.src = a.image;

      const achievementPercent = document.createElement("p");
      achievementPercent.classList.add("achievement-percent");
      achievementPercent.textContent = `${a.percent}%`;

      achievement.appendChild(achievementName);
      achievement.appendChild(achievementLogo);
      achievement.appendChild(achievementDesc);
      achievement.appendChild(achievementPercent);
      achievementContainer.appendChild(achievement);
    })

    const h1Element = document.createElement("h1");
    h1Element.textContent = "Game Achievements";
    h1Element.style.marginTop = "3rem"
    h1Element.style.marginBottom = "2rem"

    contents.appendChild(h1Element);
    contents.appendChild(achievementContainer);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
