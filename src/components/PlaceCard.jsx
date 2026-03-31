import React from 'react';
import PropTypes from 'prop-types';
import { Star, MapPin, PlusCircle, CheckCircle } from 'lucide-react';
import { useTrip } from '../context/TripContext';


const PlaceCard = ({ place, onCardClick }) => {
  const { itinerary, addPlace } = useTrip();

  // Check if place is already in the itinerary
  const isAdded = itinerary.some((p) => p.place_id === place.place_id);

  // Fallback image if place has no photos
  const photoUrl = place.photos && place.photos.length > 0 
    ? place.photos[0].getUrl({ maxWidth: 400 }) 
    : 'https://images.unsplash.com/photo-1488646953014-c8bf962c0e81?auto=format&fit=crop&w=400&q=80';

  return (
    <div 
      onClick={onCardClick}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl flex flex-col h-full cursor-pointer hover:border-teal-500/50 hover:shadow-teal-500/20"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={photoUrl} 
          alt={place.name} 
          className="w-full h-full object-cover"
        />
        {place.rating && (
          <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-amber-500 text-sm font-semibold">
            <Star className="w-4 h-4 fill-amber-500" />
            {place.rating}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{place.name}</h3>
        
        <div className="flex items-start gap-2 text-slate-300 text-sm mb-4">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-400" />
          <span className="line-clamp-2">{place.vicinity || place.formatted_address || "Address not available"}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isAdded) addPlace(place);
            }}
            disabled={isAdded}
            className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors duration-300 ${
              isAdded 
                ? 'bg-teal-900/50 text-teal-300 cursor-not-allowed border border-teal-500/30' 
                : 'bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/25'
            }`}
          >
            {isAdded ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Added to Trip
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                Add to Trip
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.shape({
    place_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    vicinity: PropTypes.string,
    formatted_address: PropTypes.string,
    rating: PropTypes.number,
    photos: PropTypes.array,
  }).isRequired,
};

export default PlaceCard;
