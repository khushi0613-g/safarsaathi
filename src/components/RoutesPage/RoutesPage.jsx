import React, { useState, useEffect } from 'react';
import { getAllRoutes, searchRoutes } from '../../api';
import { useLocation } from 'react-router-dom';

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await getAllRoutes();
        if (data.success) setRoutes(data.routes);
      } catch (err) {
        console.error('Failed to fetch routes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoutes();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      const reload = async () => {
        const data = await getAllRoutes();
        if (data.success) setRoutes(data.routes);
      };
      reload();
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const data = await searchRoutes(search);
        if (data.success) setRoutes(data.routes);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-10 py-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#1a1a2e] mb-2">All Bus Routes</h1>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm animate-pulse h-16"/>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#1a1a2e] mb-2">All Bus Routes</h1>
        <p className="text-sm text-gray-500 mb-6">Browse all Udaipur city bus routes and stops</p>
        <div className="relative inline-block w-full max-w-lg">
          <input
            type="text"
            placeholder="Search by route name, number or stop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#f5a623] transition-colors"
          />
          {searching && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              Searching...
            </span>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {routes.map((route) => (
          <div
            key={route._id}
            className="bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-[#f5a623] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div
              className="flex justify-between items-center px-5 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpanded(expanded === route._id ? null : route._id)}
            >
              <div className="flex items-center gap-3">
                <span className="bg-[#1a1a2e] text-white px-3 py-1 rounded-full text-xs font-bold">
                  Route {route.routeNumber}
                </span>
                <span className="text-sm font-semibold text-gray-700">{route.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  On Time
                </span>
                <span className="text-xs text-gray-400">🕐 Every {route.frequency}</span>
                <span className="text-xs text-gray-300">{expanded === route._id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expanded === route._id && (
              <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex gap-6 mb-4 text-xs text-gray-500">
                  <span>🌅 First bus: <strong>{route.firstBus}</strong></span>
                  <span>🌙 Last bus: <strong>{route.lastBus}</strong></span>
                  <span>⏱ Every: <strong>{route.frequency}</strong></span>
                </div>
                <p className="text-sm font-semibold text-gray-500 mb-3">
                  🚏 Stops ({route.stops.length})
                </p>
                <div className="flex flex-col gap-2">
                  {route.stops.map((stop, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        index === 0 || index === route.stops.length - 1
                          ? 'bg-[#1a1a2e]' : 'bg-[#f5a623]'
                      }`}/>
                      <span>{stop.name}</span>
                      {index === 0 && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Start</span>
                      )}
                      {index === route.stops.length - 1 && (
                        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">End</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {routes.length === 0 && !loading && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No routes found for "{search}"
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutesPage;