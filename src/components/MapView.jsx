import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PlaceCard from './PlaceCard';
import { Search, Loader2, Utensils, Coffee, TreePine, Landmark, MapPin } from 'lucide-react';

/*
  OpenStreetMap + Leaflet + Mocking Data Integration
 
*/

// Fix default leaflet marker icon issue in Vite/Webpack build
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DEFAULT_CENTER = [51.5074, -0.1278]; // London

// --- Helper function to center map on Search ---
const MapUpdater = ({ center, zoomLevel }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoomLevel, { duration: 1.5 });
  }, [center, zoomLevel, map]);
  return null;
};

const MapView = () => {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [activeFilter, setActiveFilter] = useState('restaurant');
  const [isSearching, setIsSearching] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(13);

  const filters = [
    { id: 'restaurant', label: 'Restaurants', icon: Utensils },
    { id: 'cafe', label: 'Cafes', icon: Coffee },
    { id: 'park', label: 'Parks', icon: TreePine },
    { id: 'tourist_attraction', label: 'Attractions', icon: Landmark }
  ];

  // Uses OpenStreetMap Overpass API to fetch actual nearby places
  const fetchRealPlaces = async (baseLat, baseLng, type) => {
    const typeQueries = {
      restaurant: 'nwr["amenity"="restaurant"]',
      cafe: 'nwr["amenity"="cafe"]',
      park: 'nwr["leisure"="park"]',
      tourist_attraction: 'nwr["tourism"="attraction"]'
    };
    
    const queryTag = typeQueries[type] || typeQueries.restaurant;
    
    const query = `
      [out:json][timeout:25];
      ${queryTag}["name"](around:3000, ${baseLat}, ${baseLng});
      out center 30;
    `;
    
    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: query
      });
      
      if (!response.ok) throw new Error("Overpass API failed");
      
      const data = await response.json();
      
      const defaultPhotos = {
        restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
        cafe: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
        park: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=500&q=80",
        tourist_attraction: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=80"
      };

      const mappedPlaces = data.elements
        .filter(el => el.tags && el.tags.name) // only take places with names
        .map((el) => ({
          place_id: `osm_${el.id}`,
          name: el.tags.name,
          vicinity: el.tags["addr:street"] 
            ? `${el.tags["addr:housenumber"] || ''} ${el.tags["addr:street"]}`.trim()
            : `${type.charAt(0).toUpperCase() + type.slice(1)} nearby`,
          rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // Mock rating between 3.5 - 5.0
          coords: [el.lat || el.center?.lat, el.lon || el.center?.lon],
          photos: [{
            getUrl: () => defaultPhotos[type]
          }]
        })).filter(p => p.coords[0] && p.coords[1]);
        
      if (mappedPlaces.length > 0) return mappedPlaces;
      throw new Error("No places found, triggering fallback");
    } catch (error) {
      console.warn("Overpass API unavailable or empty. Falling back to dynamic mock data for demo:", error);
      
      // Fallback: Generate dynamic, impressive mock layout so presentation doesn't break
      const queryName = searchQuery ? searchQuery.split(',')[0].trim() : 'Local';
      
      const typeSuffixes = {
        restaurant: ["Grill", "Bistro", "Dining", "Eatery", "Kitchen", "Tavern", "House", "Spot"],
        cafe: ["Roasters", "Brewery", "Cafe", "Coffee House", "Espresso", "Bakery", "Perk", "Mugs"],
        park: ["Park", "Gardens", "Square", "Plaza", "Green", "Meadows", "Commons", "Trails"],
        tourist_attraction: ["Museum", "Gallery", "Landmark", "Observatory", "Monument", "Center", "Tower", "Exhibition"]
      };
      
      const defaultPhotos = {
        restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
        cafe: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
        park: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=500&q=80",
        tourist_attraction: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&q=80"
      };

      return Array.from({ length: 12 }).map((_, i) => {
        const randomSuffix = typeSuffixes[type][Math.floor(Math.random() * typeSuffixes[type].length)];
        return {
          place_id: `dynamic_${type}_${baseLat}_${baseLng}_${i}`,
          name: `${queryName} ${randomSuffix} ${i+1}`,
          vicinity: `${Math.floor(Math.random() * 900 + 100)} ${queryName} Avenue, ${(Math.random() * 2 + 0.1).toFixed(1)} mi away`,
          rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
          coords: [baseLat + (Math.random() - 0.5) * 0.04, baseLng + (Math.random() - 0.5) * 0.04],
          photos: [{ getUrl: () => defaultPhotos[type] }]
        };
      });
    }
  };

  useEffect(() => {
    // Initial data load when mounted
    const loadInitial = async () => {
      setIsSearching(true);
      const results = await fetchRealPlaces(center[0], center[1], activeFilter);
      setPlaces(results);
      setIsSearching(false);
      setIsMapReady(true);
    };
    loadInitial();
  }, []);

  const handleFilterClick = async (typeId) => {
    setActiveFilter(typeId);
    setZoomLevel(13); // Reset zoom on new search
    setIsSearching(true);
    const results = await fetchRealPlaces(center[0], center[1], typeId);
    setPlaces(results);
    setIsSearching(false);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery.trim())}`, {
        headers: { 'Accept-Language': 'en-US,en;q=0.9', 'User-Agent': 'WanderlyAdvisor/1.0' }
      });
      
      if (!resp.ok) throw new Error("Nominatim API failed");
      
      const data = await resp.json();
      
      if (data && data.length > 0) {
        const topResult = data[0];
        const newLat = parseFloat(topResult.lat);
        const newLng = parseFloat(topResult.lon);
        
        setZoomLevel(13);
        setCenter([newLat, newLng]);
        // Update mock places sequentially
        const results = await fetchRealPlaces(newLat, newLng, activeFilter);
        setPlaces(results);
      } else {
        alert("City not found. Try a different query (e.g., 'Paris', 'Tokyo').");
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  if (!isMapReady) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-teal-500 animate-spin mb-4" />
        <p className="text-slate-300 font-medium tracking-wide animate-pulse">Initializing Canvas Map...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {/* Left panel: Map & Search (60%) */}
      <div className="lg:w-3/5 flex flex-col h-full space-y-4">
        
        {/* Search & Filters */}
        <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg relative z-[500]">
          <form onSubmit={handleSearchSubmit} className="relative mb-4 flex gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search an actual location (e.g., 'Tokyo' or 'Sydney')"
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <button 
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-lg font-semibold transition-colors disabled:opacity-70 disabled:cursor-wait"
            >
              Go
            </button>
          </form>
          
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => handleFilterClick(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30 ring-2 ring-teal-500 ring-offset-2 ring-offset-slate-800'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Leaflet Map */}
        <div className="flex-grow rounded-xl overflow-hidden border border-white/10 shadow-xl min-h-[400px] relative z-0">
          <MapContainer 
            center={center} 
            zoom={zoomLevel} 
            scrollWheelZoom={true} 
            style={{ height: "100%", width: "100%", zIndex: 0 }}
          >
            {/* Base open source tile layer. Has dark theme variations available via thunderforest/cartodb, but standard OSM is most reliable for testing without keys */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapUpdater center={center} zoomLevel={zoomLevel} />

            {/* Render mock places as markers */}
            {places.map((place) => (
               <Marker 
                 key={place.place_id} 
                 position={place.coords}
               >
                 <Popup className="custom-popup">
                   <div className="font-semibold text-slate-900">{place.name}</div>
                   <div className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                     <Utensils className="w-3 h-3" />
                     {place.vicinity}
                   </div>
                 </Popup>
               </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Right panel: Search Results (40%) */}
      <div className="lg:w-2/5 flex flex-col h-[600px] lg:h-full">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-xl font-bold text-white">Results Nearby</h2>
          {isSearching && <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />}
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2 space-y-4 rounded-xl custom-scrollbar pb-4">
          {places.length === 0 && !isSearching ? (
             <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-white/5">
               <p className="text-slate-400">No results to show. Try a different location.</p>
             </div>
          ) : (
            places.map((place) => (
              <PlaceCard 
                key={place.place_id} 
                place={place} 
                onCardClick={() => {
                  setCenter(place.coords);
                  setZoomLevel(16); // Zoom in closer for specific place clicking
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
