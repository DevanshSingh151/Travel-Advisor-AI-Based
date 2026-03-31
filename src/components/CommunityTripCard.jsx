import React from 'react';
import { IndianRupee, MapPin, User, Calendar } from 'lucide-react';

const CommunityTripCard = ({ trip }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(20,184,166,0.2)]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.destination}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-1 drop-shadow-lg">
            <MapPin className="w-5 h-5 text-teal-400" /> {trip.destination}
          </h3>
        </div>
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1 font-semibold text-white shadow-lg">
          <IndianRupee className="w-4 h-4 text-teal-400" />
          {trip.budget}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <span className="text-sm font-medium text-slate-300">{trip.user}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Calendar className="w-3 h-3" /> {trip.duration}
          </div>
        </div>
        
        <div className="space-y-3 relative z-10">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Flights & Stay</span>
              <span className="font-semibold text-slate-300">{trip.breakdown.flights}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div style={{ width: `${trip.breakdown.flights}%` }} className="bg-teal-400 h-full"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Food & Activities</span>
              <span className="font-semibold text-slate-300">{trip.breakdown.food}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div style={{ width: `${trip.breakdown.food}%` }} className="bg-amber-400 h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTripCard;
