# 🌍 Travel Advisor (AI-Based)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)](https://leafletjs.com/)

A premium, highly interactive single-page application (SPA) built for organizing, discovering, and budgeting your next dream vacation. Engineered without the need for expensive API keys, this platform leverages open-source OpenStreetMap (OSM) tools and dynamic algorithmic fallbacks to deliver a bulletproof presentation-ready experience.

![Uploading image.png…]()



---

## ✨ Key Features

*   **Interactive Live Map Discovery** 🗺️
    *   Search any city globally using the integrated **Nominatim Geocoding API**.
    *   Query and filter real-world restaurants, cafes, parks, and tourist attractions securely via the **Overpass QL API**. 
    *   **Dynamic Fly-To Interactivity:** Click on any resulting place card to command the Leaflet map to smoothly animate, pan across the globe, and zoom directly into street-level view of that specific venue!
*   **Presentation-Proof Architecture** 🛡️
    *   Features a custom-built generative algorithm. If open-source map servers experience heavy load or rate limits during a live demo, the app instantly switches to generating highly realistic, hyper-localized mock data (e.g. producing "Times Square Grill 1" exactly where you clicked) ensuring the UI never crashes or looks empty.
*   **Trip Planner & Itinerary Builder** 🧳
    *   Add destinations to your custom trip itinerary with a single click.
    *   Managed globally via React Context API and automatically persisted via `localStorage` so your plans survive browser refreshes.
*   **Community Budgets & Expense Tracker** 💰
    *   A completely unique dashboard featuring real-world community travel spends.
    *   A beautifully animated, interactive **Rupee (₹) Expense Calculator**. Input your estimated flights, accommodations, food, and activities to watch the dynamic progress bar calculate your total trip footprint in real-time.
*   **Modern Glassmorphism UI** 🎨
    *   Styled entirely with Tailwind CSS using a sleek "Midnight" dark-mode aesthetic with glowing teal and amber accents.
    *   Responsive layouts optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

*   **Frontend Framework:** React 18 (Functional Components, Hooks)
*   **Build Tool & Dev Server:** Vite
*   **Styling:** Tailwind CSS (v4 structure)
*   **Routing:** React Router DOM (v6)
*   **Mapping Engine:** Leaflet + React-Leaflet
*   **Geocoding & POI Data:** OpenStreetMap (Nominatim & Overpass APIs)
*   **Icons:** Lucide-React
*   **State Management:** React Context API

---

## 📂 Project Structure

```text
travel_advisor/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images and vectors
│   ├── components/
│   │   ├── CommunityTripCard.jsx   # Feed cards for budget page
│   │   ├── ContactForm.jsx         # Validation form
│   │   ├── ExpenseCalculator.jsx   # Interactive ₹ budget tracker
│   │   ├── Footer.jsx
│   │   ├── ItineraryList.jsx       # Renders saved places in planner
│   │   ├── MapView.jsx             # Core OpenStreetMap & Overpass engine
│   │   ├── Navbar.jsx              # Responsive header 
│   │   └── PlaceCard.jsx           # Individual location cards
│   ├── context/
│   │   └── TripContext.jsx         # Global state for Trip Planner
│   ├── pages/
│   │   ├── Contact.jsx             # Contact info & form page
│   │   ├── Destinations.jsx        # Map discovery page
│   │   ├── Expenses.jsx            # Community Budgets page
│   │   ├── Home.jsx                # Landing page with CTA
│   │   └── Planner.jsx             # User itinerary page
│   ├── App.jsx                 # Main Router application wrapper
│   ├── index.css               # Global Tailwind directives
│   └── main.jsx                # React DOM entry point
├── package.json            
├── vite.config.js          
└── eslint.config.js        
```

---

## 🚀 Getting Started

To run this project locally:

### 1. Clone the repository
```bash
git clone https://github.com/DevanshSingh151/Travel-Advisor-AI-Based.git
cd Travel-Advisor-AI-Based
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

> **Note:** The application will typically boot up on `http://localhost:5173`. No `.env` files or API keys are required for the community map data to function!

---

## 👨‍💻 Developed By

**Devansh Singh** & **Sanidhya**  
*VIT Chennai*

Feel free to fork this project and shape your own perfect interactive mapped itinerary!
