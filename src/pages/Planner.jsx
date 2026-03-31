import React from 'react';
import ItineraryList from '../components/ItineraryList';
import { CalendarDays } from 'lucide-react';

/*
  Planner Page
  Organizes selected destinations and provides visual order.
*/

const Planner = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-teal-500/20 rounded-xl border border-teal-500/30">
            <CalendarDays className="w-8 h-8 text-teal-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Trip Planner</h1>
            <p className="text-slate-400 mt-2 text-lg">Manage your custom itinerary and organizing your perfect travel experience.</p>
          </div>
        </div>

        <ItineraryList />
      </div>
    </div>
  );
};

export default Planner;
