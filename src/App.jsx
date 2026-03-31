import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';

// Pages
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Planner from './pages/Planner';
import Contact from './pages/Contact';
import Expenses from './pages/Expenses';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-900 font-['Inter'] text-slate-100 selection:bg-teal-500/30">
          <Navbar />
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/budgets" element={<Expenses />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TripProvider>
  );
}

export default App;
