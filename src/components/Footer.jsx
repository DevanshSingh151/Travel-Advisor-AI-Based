import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-white/10 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}Devansh and Sanidhya Travel Advisor. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-slate-500">
          Designed with React &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
