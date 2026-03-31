import React from 'react';
import MapView from '../components/MapView';

/*
  Destinations Page
*/

const Destinations = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-slate-900">
      <div className="bg-slate-800 border-b border-white/10 px-6 py-4 flex-shrink-0 z-10 shadow-md">
        <h1 className="text-2xl font-bold text-white mb-1">Explore Destinations</h1>
        <p className="text-slate-400 text-sm">Discover top-rated places around the world</p>
      </div>
      
      {/* Map and Places Container */}
      <div className="flex-grow p-4 lg:p-6 overflow-hidden">
        <MapView />
      </div>
    </div>
  );
};

export default Destinations;
