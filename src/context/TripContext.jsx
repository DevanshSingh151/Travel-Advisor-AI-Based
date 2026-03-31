import React, { createContext, useContext, useState, useEffect } from 'react';

/* 
Trip Planner using React State Management
*/

const TripContext = createContext();

export const useTrip = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [itinerary, setItinerary] = useState(() => {
    // Load saved trips from localStorage on initial mount
    const saved = localStorage.getItem('tripItinerary');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('tripItinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  const addPlace = (place) => {
    if (!itinerary.find((p) => p.place_id === place.place_id)) {
      setItinerary([...itinerary, place]);
    }
  };

  const removePlace = (placeId) => {
    setItinerary(itinerary.filter((place) => place.place_id !== placeId));
  };

  const clearItinerary = () => {
    setItinerary([]);
  };

  return (
    <TripContext.Provider value={{ itinerary, addPlace, removePlace, clearItinerary }}>
      {children}
    </TripContext.Provider>
  );
};
