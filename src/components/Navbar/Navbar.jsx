import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

if (
  location.pathname === "/admin-login" ||
  location.pathname === "/admin-dashboard"
) {
  return null;
}

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-gray-100 shadow-md sticky top-0 z-50 font-sans">
      
      <div
  className="
    flex
    items-center
    gap-2
    cursor-pointer
    transition-transform
    duration-300
    hover:scale-105
  "
  onClick={() => navigate('/')}
>
        <span className="text-2xl">🗺️</span>
        <span className="text-xl font-extrabold tracking-wide">
          <span className="text-[#1a1a2e]">Safar</span>
          <span className="text-[#f5a623]"> Saathi</span>
        </span>
      </div>

      <ul className="flex list-none gap-8">
        <li>
  <span
    onClick={() => navigate('/')}
    className="
      cursor-pointer
      text-gray-700
      font-medium
      hover:text-[#f5a623]
      transition-all
      duration-300
    "
  >
    Home
  </span>
</li>
  <li>
    <span
      onClick={() => navigate('/routes')}
      className="cursor-pointer text-gray-700 font-medium hover:text-[#f5a623] transition-all duration-300"
    >
      Routes
    </span>
  </li>

  <li>
    <span
      onClick={() => navigate('/livemap')}
      className="cursor-pointer text-gray-700 font-medium hover:text-[#f5a623] transition-all duration-300"
    >
      Live Map
    </span>
  </li>

  <li>
    <span
      onClick={() => navigate('/tourism')}
      className="cursor-pointer text-gray-700 font-medium hover:text-[#f5a623] transition-all duration-300"
    >
      Tourism
    </span>
  </li>

  <li>
    <span
      onClick={() => navigate('/contact')}
      className="cursor-pointer text-gray-700 font-medium hover:text-[#f5a623] transition-all duration-300"
    >
      Contact
    </span>
  </li>
</ul>
       

      <div className="flex items-center gap-4">
        <span className="text-lg cursor-pointer">🔍</span>
        <button
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm cursor-pointer hover:border-[#f5a623] transition-colors"
          onClick={() => setDarkMode && setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          className="bg-[#1a1a2e] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#f5a623] transition-colors cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;