import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPopularRoutes } from '../../api';

const PopularRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await getPopularRoutes();
        if (data.success) {
          setRoutes(data.routes);
        } else {
          setError('Could not load routes');
        }
      } catch (err) {
        setError('Backend not running');
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 px-10 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
           <h2 className="text-4xl font-bold text-[#1a1a2e]">
  Popular City Bus Routes
</h2>

<p className="text-gray-500 mt-2">
  Explore the most frequently used bus routes across Udaipur
</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded mb-2 w-1/2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 px-10 py-16">
        <div className="text-center text-gray-400 py-10">
          <p className="text-4xl mb-3">🚌</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs text-gray-300 mt-1">Make sure backend is running on port 5000</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 px-10 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold text-[#1a1a2e]">
  Popular City Bus Routes
</h2>

<p className="text-gray-500 mt-2">
  Explore the most frequently used bus routes across Udaipur
</p>
          
        </div>
        <span
          className="text-sm font-semibold text-[#1a1a2e] cursor-pointer hover:text-[#f5a623] transition-colors"
          onClick={() => navigate('/routes')}
        >
          View All Routes →
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {routes.map((route) => (
          <div
            key={route._id}
            onClick={() => navigate('/routes')}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-all duration-300"
            
            
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-[#1a1a2e]">Route {route.routeNumber}</span>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                Active
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 flex-wrap">
              <span className="font-medium">{route.from}</span>
              <span className="text-[#f5a623] font-bold">→</span>
              <span className="font-medium">{route.to}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-400">🚏 {route.stops.length} stops</div>
              <div className="text-xs text-gray-400">🕐 Every {route.frequency}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRoutes;
