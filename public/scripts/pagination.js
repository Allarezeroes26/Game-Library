const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const searchBtn = document.querySelector(".search-button");
const searchBox = document.querySelector(".game-search");

/** 
 * Handles pagination for the "Previous" button 
 */
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    fetchGame(--currentPage, 9, currentSearch, currentPlatform, currentGenre, currentDeveloper, currentTags);
  }
});

/** 
 * Handles pagination for the "Next" button 
 */
nextBtn.addEventListener("click", () => {
  fetchGame(++currentPage, 9, currentSearch, currentPlatform, currentGenre, currentDeveloper, currentTags);
});

/** 
 * Handles game search input and triggers fetch 
 */
searchBtn.addEventListener("click", () => {
  currentSearch = searchBox.value;
  currentPage = 1;
  fetchGame(currentPage, 9, currentSearch, currentPlatform, currentGenre, currentDeveloper, currentTags);
});
