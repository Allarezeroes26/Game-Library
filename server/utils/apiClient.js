// Base URL for all RAWG API endpoints
const API_BASE = "https://api.rawg.io/api/";

export async function fetchFromRAWG(endpoint, apiKey, params = {}) {
  // Convert the `params` object into a query string.
  const query = new URLSearchParams({ ...params, key: apiKey });

  // Construct the full API URL (e.g. https://api.rawg.io/api/games?search=elden+ring&key=xxx)
  const url = `${API_BASE}${endpoint}?${query.toString()}`;

  try {
    // Send an HTTP GET request to the RAWG API
    const response = await fetch(url);

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`RAWG error ${response.status}: ${errText}`);
    }

    return await response.json();

  } catch (err) {
    console.error(`API fetch failed: ${url}`, err);
    throw err;
  }
}
