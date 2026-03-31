import React from 'react';
import PropTypes from 'prop-types';
import { useTrip } from '../context/TripContext';
import { MapPin, X, Navigation } from 'lucide-react';
/* 
  Allows users to review, reorder (visually), and remove destinations.
*/
const ItineraryList = () => {
  const { itinerary, removePlace, clearItinerary } = useTrip();

  if (itinerary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-sm text-center">
        <div className="bg-slate-700/50 p-4 rounded-full mb-4">
          <Navigation className="w-10 h-10 text-teal-500/50" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Your trip is empty</h3>
        <p className="text-slate-400 max-w-sm">
          Browse destinations and click "Add to Trip" on places you'd like to visit to start building your itinerary.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Itinerary</h2>
          <p className="text-slate-400 mt-1">
            {itinerary.length} {itinerary.length === 1 ? 'destination' : 'destinations'} planned
          </p>
        </div>
        <button
          onClick={clearItinerary}
          className="text-sm px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <p className="text-xs text-slate-500 italic px-6 pt-4">
        (Drag-to-reorder coming soon)
      </p>

      <ul className="p-6 space-y-4">
        {itinerary.map((place, index) => {
          const photoUrl = place.photos && place.photos.length > 0 
            ? place.photos[0].getUrl({ maxWidth: 100 }) 
            : 'https://images.unsplash.com/photo-1488646953014-c8bf962c0e81?auto=format&fit=crop&w=100&q=80';

          return (
            <li 
              key={place.place_id} 
              className="group relative flex items-center p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold mr-4 z-10">
                {index + 1}
              </div>
              
              <img 
                src={photoUrl} 
                alt={place.name} 
                className="w-16 h-16 rounded-lg object-cover bg-slate-700 hidden sm:block shadow-md mr-4"
              />
              
              <div className="flex-grow pr-10">
                <h4 className="text-lg font-semibold text-slate-100">{place.name}</h4>
                <div className="flex items-start gap-1.5 text-slate-400 text-sm mt-1">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{place.vicinity || place.formatted_address}</span>
                </div>
              </div>

              <button
                onClick={() => removePlace(place.place_id)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Remove destination"
              >
                <X className="w-5 h-5" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// PropTypes for the expected global state items are inherently verified by TripContext, 
// but we define them here structurally for documentation.
ItineraryList.propTypes = {
  // Uses context
};

export default ItineraryList;
