# 🎮 Game Library

A responsive web application that lets users explore games by **genre, platform, developer, and tags** — powered by a RESTful API built with Node.js and Express.  

It displays game details such as **trailers, screenshots, achievements, DLCs, related games, and store links**, all fetched dynamically.

---

## 🚀 Features

-  Search games by title  
-  Filter by genres, platforms, developers, and tags  
-  Watch trailers directly on the detail page  
-  View screenshots and related games  
-  See achievements and DLCs for each game  
-  Direct store links (Steam, Epic, etc.)  
-  Responsive front-end built with pure HTML, CSS, and JavaScript  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | HTML, CSS, JavaScript, GSAP |
| **Backend** | Node.js, Express.js |
| **API Source** | Custom REST endpoints from RAWG API wrapper |
| **Version Control** | Git & GitHub |
| **Runtime** | Node.js (v18+) |

---

## ⚙️ Setup Instructions (Local)

### 1. Clone the repository
```
git clone https://github.com/Allarezeroes26/Game-Library.git
cd Game-Library
```

### 2. Install Dependencies
```
npm install
```

### 3. Create a .env file
Create a .env file in the root directory in the project and then
```
PORT = 8080
API_KEY = your_rawg_api_key
```

### 4. Run the App
```
npm start
```
---

## 📍 API Routes

Below is a list of all available API endpoints in the **Game Library API**:

### Games
| Method | Endpoint | Description |
|:--------|:----------|:-------------|
| GET | `/api/games` | Get all games |
| GET | `/api/games/:id` | Get a specific game by ID |
| GET | `/api/games/:id/screenshots` | Get screenshots for a game |
| GET | `/api/games/:id/movies` | Get trailers or gameplay videos for a game |
| GET | `/api/games/:id/achievements` | Get achievements for a game |
| GET | `/api/games/:id/additions` | Get DLCs or expansions for a game |
| GET | `/api/games/:id/game-series` | Get related games from the same series |
| GET | `/api/games/:id/stores` | Get store links where the game is available |

### Genres
| Method | Endpoint | Description |
|:--------|:----------|:-------------|
| GET | `/api/genres` | Get all genres |

### Platforms
| Method | Endpoint | Description |
|:--------|:----------|:-------------|
| GET | `/api/platforms` | Get all supported platforms |

### Developers
| Method | Endpoint | Description |
|:--------|:----------|:-------------|
| GET | `/api/developers/:slug` | Get details about a specific developer |

### Stores
| Method | Endpoint | Description |
|:--------|:----------|:-------------|
| GET | `/api/stores` | Get all stores |
| GET | `/api/stores/:id` | Get details for a specific store |

### Tags
| Method | Endpoint | Description |
|:--------|:----------|:-------------|
| GET | `/api/tags/:id` | Get details for a specific tag |

💡 **Tip:**  
All endpoints return JSON data. Use query parameters or route params (`:id`, `:slug`) to fetch specific content dynamically.

---

### 🗒️ MY NOTES!!!
- Use Async/Await for all api calls
- Animations in Game Lib intro was made with GSAP
---

## 🧑‍💻 Created By
Erwin Bacani [Github](https://github.com/Allarezeroes26), [Linkedin](https://github.com/Allarezeroes26).

---

## Demo
https://game-library-v8cx.onrender.com

---

## ⚖️ License
This project is licensed under MIT License<br/>
Feel free to use, modify, and share it — just credit the original.
