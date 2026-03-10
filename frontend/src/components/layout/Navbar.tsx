import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 w-full bg-white border-b border-slate-100 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-[#ED1C24] font-bold text-xl">Fresh Cuts</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-slate-600 hover:text-[#ED1C24] transition-colors font-medium">Home</a>
          <a href="#services" className="text-slate-600 hover:text-[#ED1C24] transition-colors font-medium">Services</a>
          <a href="#queue" className="text-slate-600 hover:text-[#ED1C24] transition-colors font-medium">Walk-In Queue</a>
          <Link to="/booking" className="bg-[#ED1C24] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#c4161d] transition-colors">
            Book Now
          </Link>
        </div>

        <div className="md:hidden">
          <button className="text-slate-800">
            <Menu size={24} />
          </button>
        </div>
      </nav>
    </header>
  );
};