import React, { useState } from 'react';
import { Calculator, IndianRupee, PieChart, Plane, Home, Utensils, Activity } from 'lucide-react';

const ExpenseCalculator = () => {
  const [expenses, setExpenses] = useState({
    flights: 0,
    accommodation: 0,
    food: 0,
    activities: 0,
    misc: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenses(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const total = Object.values(expenses).reduce((acc, curr) => acc + curr, 0);

  // Calculate percentages for the progress bar
  const getWidth = (value) => total === 0 ? 0 : (value / total) * 100;

  return (
    <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
          <Calculator className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Expense Tracker</h2>
          <p className="text-sm text-slate-400">Calculate your estimated trip budget</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 mb-8">
        <label className="flex items-center justify-between text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700 focus-within:border-amber-500/50 transition-colors">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-teal-400" />
            <span className="font-medium">Flights</span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="w-4 h-4 text-slate-500" />
            <input 
              type="number" min="0" name="flights" 
              value={expenses.flights || ''} onChange={handleChange}
              placeholder="0.00"
              className="bg-transparent text-right w-24 text-white focus:outline-none font-semibold"
            />
          </div>
        </label>

        <label className="flex items-center justify-between text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700 focus-within:border-amber-500/50 transition-colors">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">Accommodation</span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="w-4 h-4 text-slate-500" />
            <input 
              type="number" min="0" name="accommodation" 
              value={expenses.accommodation || ''} onChange={handleChange}
              placeholder="0.00"
              className="bg-transparent text-right w-24 text-white focus:outline-none font-semibold"
            />
          </div>
        </label>

        <label className="flex items-center justify-between text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700 focus-within:border-amber-500/50 transition-colors">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-400" />
            <span className="font-medium">Food & Dining</span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="w-4 h-4 text-slate-500" />
            <input 
              type="number" min="0" name="food" 
              value={expenses.food || ''} onChange={handleChange}
              placeholder="0.00"
              className="bg-transparent text-right w-24 text-white focus:outline-none font-semibold"
            />
          </div>
        </label>

        <label className="flex items-center justify-between text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700 focus-within:border-amber-500/50 transition-colors">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-rose-400" />
            <span className="font-medium">Activities</span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="w-4 h-4 text-slate-500" />
            <input 
              type="number" min="0" name="activities" 
              value={expenses.activities || ''} onChange={handleChange}
              placeholder="0.00"
              className="bg-transparent text-right w-24 text-white focus:outline-none font-semibold"
            />
          </div>
        </label>

        <label className="flex items-center justify-between text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700 focus-within:border-amber-500/50 transition-colors">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-slate-400" />
            <span className="font-medium">Miscellaneous</span>
          </div>
          <div className="flex items-center">
            <IndianRupee className="w-4 h-4 text-slate-500" />
            <input 
              type="number" min="0" name="misc" 
              value={expenses.misc || ''} onChange={handleChange}
              placeholder="0.00"
              className="bg-transparent text-right w-24 text-white focus:outline-none font-semibold"
            />
          </div>
        </label>
      </div>

      {/* Dynamic Total & Progress Bar */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-700 shadow-inner">
        <div className="flex justify-between items-end mb-4">
          <span className="text-slate-400 font-medium">Estimated Total</span>
          <span className="text-3xl font-bold text-white tracking-tight">₹{total.toFixed(2)}</span>
        </div>
        
        {/* Visual Bar */}
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
          {total > 0 ? (
            <>
              <div style={{ width: `${getWidth(expenses.flights)}%` }} className="bg-teal-400 h-full transition-all duration-500" title="Flights"></div>
              <div style={{ width: `${getWidth(expenses.accommodation)}%` }} className="bg-indigo-400 h-full transition-all duration-500" title="Accommodation"></div>
              <div style={{ width: `${getWidth(expenses.food)}%` }} className="bg-amber-400 h-full transition-all duration-500" title="Food"></div>
              <div style={{ width: `${getWidth(expenses.activities)}%` }} className="bg-rose-400 h-full transition-all duration-500" title="Activities"></div>
              <div style={{ width: `${getWidth(expenses.misc)}%` }} className="bg-slate-400 h-full transition-all duration-500" title="Misc"></div>
            </>
          ) : (
            <div className="w-full bg-slate-700 h-full"></div>
          )}
        </div>
        
        {/* Legend */}
        {total > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs font-medium text-slate-400">
            {expenses.flights > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-400"></span> Flights</span>}
            {expenses.accommodation > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-400"></span> Stay</span>}
            {expenses.food > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Food</span>}
            {expenses.activities > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400"></span> Fun</span>}
            {expenses.misc > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400"></span> Misc</span>}
          </div>
        )}
      </div>

    </div>
  );
};

export default ExpenseCalculator; 
