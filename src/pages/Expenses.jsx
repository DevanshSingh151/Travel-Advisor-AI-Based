import React from 'react';
import ExpenseCalculator from '../components/ExpenseCalculator';
import CommunityTripCard from '../components/CommunityTripCard';

const mockTrips = [
  {
    id: 1,
    destination: 'Paris, France',
    user: 'Alex Travels',
    budget: '2,05,000',
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1773&auto=format&fit=crop',
    breakdown: { flights: 60, food: 40 }
  },
  {
    id: 2,
    destination: 'Bali, Indonesia',
    user: 'Sarah Explorer',
    budget: '95,000',
    duration: '10 Days',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2838&auto=format&fit=crop',
    breakdown: { flights: 45, food: 55 }
  },
  {
    id: 3,
    destination: 'Tokyo, Japan',
    user: 'Mike Wanderlust',
    budget: '2,65,000',
    duration: '14 Days',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1794&auto=format&fit=crop',
    breakdown: { flights: 50, food: 50 }
  },
  {
    id: 4,
    destination: 'Rome, Italy',
    user: 'Emma Journeys',
    budget: '1,50,000',
    duration: '5 Days',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1696&auto=format&fit=crop',
    breakdown: { flights: 55, food: 45 }
  }
];

const Expenses = () => {
  return (
    <div className="flex-grow bg-slate-900 pb-20 relative px-4 sm:px-6 lg:px-8">
      {/* Background abstract elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-teal-900/20 to-slate-900 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto pt-16">
        <div className="text-center mb-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-md font-['Poppins']">
            Community Budgets &amp; Expenses
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            See real trip budgets from the community and use our interactive 
            calculator to plan out exactly how much your next adventure will cost.
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          
          {/* Left Column: Interactive Calculator (Takes up 5 columns on large screens) */}
          <div className="lg:col-span-5 h-full">
            <div className="sticky top-24">
              <ExpenseCalculator />
            </div>
          </div>

          {/* Right Column: Community Trips (Takes up 7 columns on large screens) */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-slate-700/50 pb-4">
              Work Done By The People
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTrips.map(trip => (
                <CommunityTripCard key={trip.id} trip={trip} />
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Expenses;
