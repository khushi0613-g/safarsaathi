import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/hero.jpg.png';
import hero2 from '../../assets/hero2.jpg';
import hero3 from '../../assets/hero3.jpg';
import { searchRoutes } from '../../api';
import { motion } from "framer-motion";

const slides = [heroImg, hero2, hero3];
const words = ['Destination', 'Route Number', 'Bus Stop'];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    const word = words[wordIndex];
    let timeout;
    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 1500);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 60);
      } else {
        setWordIndex(prev => (prev + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIndex]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target) &&
          inputRef.current && !inputRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Live search as user types
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      setError('');
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await searchRoutes(query);
        if (data.success) {
          setResults(data.routes);
          setShowResults(true);
          setError('');
        }
      } catch {
        setError('Backend not running');
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleRouteClick = (route) => {
    setShowResults(false);
    setQuery('');
    navigate('/routes', { state: { highlightRoute: route._id } });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-[1200ms] ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}
      

      <div
        className="absolute w-full h-full flex items-center justify-center pb-20"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.75) 100%)' }}
      >
        <div className="text-center text-white w-full max-w-3xl px-5">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
               Discover
                <br />
             <span className="text-[#f5a623]">
              Udaipur Like Never Before
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                Real-time bus tracking, smart route planning,
                 and unforgettable experiences across the City of Lakes.
              </p>

          {/* Search Box */}
          <div className="relative w-full max-w-2xl mx-auto mb-6">
            <div className="flex items-center bg-white rounded-full px-6 py-4 shadow-2xl">
              <span className="text-lg mr-3 flex-shrink-0">
                {searching ? '🔄' : '📍'}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && query.trim() && navigate('/routes')}
                placeholder={`Enter ${displayed}|`}
                className="flex-1 border-none outline-none text-sm text-gray-700 bg-transparent py-2 min-w-0"
              />
              <button
                onClick={() => query.trim() && navigate('/routes')}
                className="bg-[#f5a623] text-white px-6 py-3 rounded-full text-sm font-bold flex-shrink-0 hover:bg-[#e09400] transition-colors"
              >
                {searching ? 'Searching...' : 'Track Your Route →'}
              </button>
            </div>

            {error && (
              <div className="mt-2 text-red-300 text-sm font-medium">⚠️ {error}</div>
            )}

            {/* Results Dropdown */}
            {showResults && results.length > 0 && (
              <div
                ref={resultsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto"
              >
                <div className="px-4 py-2 bg-gray-50 border-b sticky top-0">
                  <p className="text-xs text-gray-500 font-semibold">
                    {results.length} route{results.length > 1 ? 's' : ''} found for "{query}"
                  </p>
                </div>

                {results.map((route) => (
                  <div
                    key={route._id}
                    onClick={() => handleRouteClick(route)}
                    className="px-5 py-4 hover:bg-orange-50 cursor-pointer transition-colors border-b last:border-0"
                  >
                    {/* Route header */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-[#1a1a2e] text-white px-3 py-1 rounded-full text-xs font-bold flex-shrink-0">
                        Route {route.routeNumber}
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{route.name}</p>
                      <span className="ml-auto text-[#f5a623] font-bold text-lg">›</span>
                    </div>

                    {/* From → To */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 ml-1">
                      <span className="w-2 h-2 rounded-full bg-[#1a1a2e]"/>
                      <span>{route.from}</span>
                      <span className="text-[#f5a623]">→→→</span>
                      <span className="w-2 h-2 rounded-full bg-[#f5a623]"/>
                      <span>{route.to}</span>
                      <span className="ml-2 text-gray-400">· 🕐 Every {route.frequency}</span>
                    </div>

                    {/* Matched stops — only show if stops matched the query */}
                    {route.matchedStops && route.matchedStops.length > 0 && (
                      <div className="mt-2 ml-1">
                        <p className="text-xs text-green-600 font-semibold mb-1">
                          ✅ Your destination is on this route:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {route.matchedStops.map((stop, i) => (
                            <span
                              key={i}
                              className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium"
                            >
                              🚏 {stop.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* All stops preview */}
                    <div className="mt-2 flex gap-1 flex-wrap">
                      {route.stops.slice(0, 4).map((stop, i) => (
                        <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${
                          route.matchedStops?.some(ms => ms.name === stop.name)
                            ? 'bg-orange-100 text-orange-700 font-semibold'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {stop.name}
                        </span>
                      ))}
                      {route.stops.length > 4 && (
                        <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                          +{route.stops.length - 4} more stops
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                <div
                  onClick={() => { navigate('/routes'); setShowResults(false); }}
                  className="px-5 py-3 text-center text-sm text-[#f5a623] font-semibold hover:bg-gray-50 cursor-pointer border-t"
                >
                  View all routes →
                </div>
              </div>
            )}

            {/* No results */}
            {showResults && results.length === 0 && !searching && query.length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl p-5 z-50 text-center">
                <p className="text-gray-500 text-sm">No routes found for "<strong>{query}</strong>"</p>
                <p className="text-gray-400 text-xs mt-1">Try: Balicha, Railway Station, Fateh Sagar...</p>
              </div>
            )}
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-2 mt-2">
            {slides.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#f5a623] scale-125' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;