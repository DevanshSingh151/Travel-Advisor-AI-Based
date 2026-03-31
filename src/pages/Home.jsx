import React from 'react';
import { Link } from 'react-router-dom';
import { Map, CalendarDays, Compass, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop" 
            alt="Beautiful travel landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 transition-all duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md mb-6">
            <span className="text-teal-400 font-semibold tracking-wide text-sm uppercase">Discover the World</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl font-[Poppins]">
            Your Journey <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-500 animate-pulse inline-block">Begins Here</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto drop-shadow-md font-light">
            Plan your perfect trip with AI-driven recommendations, live maps, and customizable itineraries.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/destinations" 
              className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:-translate-y-1"
            >
              Explore Destinations <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/planner" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              <CalendarDays className="w-5 h-5" /> Plan My Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 bg-slate-900 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Travel Advisor?</h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-teal-500/30 hover:bg-slate-800 transition-all duration-300 group">
              <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Map className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Map Search</h3>
              <p className="text-slate-400 leading-relaxed">
                Discover the best restaurants, parks, and attractions globally using precise Google Maps data.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-amber-500/30 hover:bg-slate-800 transition-all duration-300 group">
              <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CalendarDays className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Trip Planner</h3>
              <p className="text-slate-400 leading-relaxed">
                Curate your custom itinerary effortlessly. Add destinations and organize your perfect vacation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-teal-500/30 hover:bg-slate-800 transition-all duration-300 group">
              <div className="w-14 h-14 bg-teal-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Compass className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Directions</h3>
              <p className="text-slate-400 leading-relaxed">
                Easily navigate to any saved location with built-in mapping functionalities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
