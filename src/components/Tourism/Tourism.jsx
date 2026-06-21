import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../../assets/hero.jpg.png';
import Footer from '../Footer/Footer';
import { searchRoutes, getAllRoutes } from '../../api';

import cityPalace from '../../assets/cityPalace.jpg';
import fatehSagar from '../../assets/fateh-sagar.jpg';
import sajjangarh from '../../assets/Sajjangarh-Fort.jpg';
import lakePichola from '../../assets/lake-pichola.jpg';
import jagdishTemple from '../../assets/jagdish-temple.jpg';
import saheliyon from '../../assets/saheliyon-ki-bari.jpg';
import bagoreHaveli from '../../assets/bagore-ki-haveli.jpg';
import sukhadia from '../../assets/sukhadiya-circle.jpg';
import carMuseum from '../../assets/vintage-car.jpg';
import gulabBagh from '../../assets/gulab-bagh.jpg';
import ambraiGhat from '../../assets/Ambrai-Ghat.jpg';
import dudhTalai from '../../assets/doodh-talai.jpg';
import karniMata from '../../assets/karnimata.jpg';
import shilpgram from '../../assets/shilpgram.jpg';
import neemachMata from '../../assets/neemachmata.jpg';
import eklingji from '../../assets/eklingji.jpg';
import ahar from '../../assets/ahar.jpg';
import gatawali from '../../assets/gatawali.jpg';

const places = [
  {
    id: 1, name: 'City Palace', image: cityPalace, emoji: '🏰',
    description: 'A 400-year-old architectural marvel blending Rajasthani and Mughal styles. The crown jewel of Mewar history.',
    searchQuery: 'Delhi Gate',
    lat: 24.5763, lng: 73.7133,
    stop: 'Delhi Gate Stop', time: '20 min from Bus Stand',
    timings: '9:30 AM - 5:30 PM', entry: '₹30 (Indian), ₹240 (Foreign)',
    category: 'Heritage'
  },
  {
    id: 2, name: 'Fateh Sagar Lake', image: fatehSagar, emoji: '🌊',
    description: 'A beautiful artificial lake surrounded by hills. Perfect for boat rides, evening walks, and sunset views.',
    searchQuery: 'Fateh Sagar',
    lat: 24.6001, lng: 73.6698,
    stop: 'Fateh Sagar Stop', time: '25 min from Bus Stand',
    timings: 'Open all day', entry: 'Free',
    category: 'Nature'
  },
  {
    id: 3, name: 'Sajjangarh Palace', image: sajjangarh, emoji: '🏯',
    description: 'Also known as Monsoon Palace, offering breathtaking panoramic views of Udaipur and Aravalli hills.',
    searchQuery: 'Sajjangarh',
    lat: 24.5940, lng: 73.6389,
    stop: 'Sajjangarh Road Stop', time: '40 min from Bus Stand',
    timings: '8:00 AM - 6:00 PM', entry: '₹10 (Indian), ₹80 (Foreign)',
    category: 'Heritage'
  },
  {
    id: 4, name: 'Lake Pichola', image: lakePichola, emoji: '🏞️',
    description: 'The soul of Udaipur with the iconic Lake Palace and Jag Mandir islands. Best on an evening boat ride.',
    searchQuery: 'Lake Pichola',
    lat: 24.5716, lng: 73.6808,
    stop: 'Bansi Ghat Stop', time: '18 min from Bus Stand',
    timings: 'Open all day', entry: 'Free (Boat ride ₹400)',
    category: 'Nature'
  },
  {
    id: 5, name: 'Jagdish Temple', image: jagdishTemple, emoji: '🛕',
    description: 'A magnificent Indo-Aryan temple dedicated to Lord Vishnu, built in 1651. Most visited religious site.',
    searchQuery: 'Delhi Gate',
    lat: 24.5786, lng: 73.7068,
    stop: 'Jagdish Chowk Stop', time: '20 min from Bus Stand',
    timings: '4:15 AM - 1:00 PM, 5:15 PM - 8:00 PM', entry: 'Free',
    category: 'Religious'
  },
  {
    id: 6, name: 'Saheliyon Ki Bari', image: saheliyon, emoji: '🌺',
    description: 'The Garden of Maidens — a royal garden with ornamental pools, marble elephants, and fountains.',
    searchQuery: 'Fateh Sagar',
    lat: 24.5950, lng: 73.6780,
    stop: 'Saheliyon Ki Bari Stop', time: '22 min from Bus Stand',
    timings: '9:00 AM - 7:00 PM', entry: '₹10 (Indian), ₹50 (Foreign)',
    category: 'Garden'
  },
  {
    id: 7, name: 'Bagore Ki Haveli', image: bagoreHaveli, emoji: '🏛️',
    description: 'An 18th-century waterfront mansion hosting the famous Dharohar Dance Show with 100+ rooms.',
    searchQuery: 'Delhi Gate',
    lat: 24.5797, lng: 73.6800,
    stop: 'Gangaur Ghat Stop', time: '20 min from Bus Stand',
    timings: '10:00 AM - 5:30 PM', entry: '₹30 (Indian), ₹100 (Foreign)',
    category: 'Heritage'
  },
  {
    id: 8, name: 'Sukhadia Circle', image: sukhadia, emoji: '⛲',
    description: 'A popular recreational spot with a large fountain, garden, and food stalls. Perfect for evenings.',
    searchQuery: 'Sukhadiya Circle',
    lat: 24.5880, lng: 73.6975,
    stop: 'Sukhadia Circle Stop', time: '15 min from Bus Stand',
    timings: 'Open all day', entry: 'Free',
    category: 'Recreation'
  },
  {
    id: 9, name: 'Vintage Car Museum', image: carMuseum, emoji: '🚗',
    description: 'A stunning collection of vintage and classic cars once owned by the Maharanas of Mewar.',
    searchQuery: 'Chetak Circle',
    lat: 24.5785, lng: 73.6842,
    stop: 'Garden Hotel Stop', time: '15 min from Bus Stand',
    timings: '9:00 AM - 9:00 PM', entry: '₹250 (Indian), ₹350 (Foreign)',
    category: 'Museum'
  },
  {
    id: 10, name: 'Gulab Bagh', image: gulabBagh, emoji: '🌹',
    description: 'The largest garden in Rajasthan with a zoo, library, rose garden, and a toy train for children.',
    searchQuery: 'Surajpole',
    lat: 24.5770, lng: 73.7080,
    stop: 'Gulab Bagh Stop', time: '12 min from Bus Stand',
    timings: '8:00 AM - 6:00 PM', entry: '₹10 (Indian)',
    category: 'Garden'
  },
  {
    id: 11, name: 'Ambrai Ghat', image: ambraiGhat, emoji: '🌅',
    description: 'One of the most picturesque ghats offering stunning views of City Palace and Lake Palace at sunset.',
    searchQuery: 'Chetak Circle',
    lat: 24.5740, lng: 73.6830,
    stop: 'Ambrai Ghat Stop', time: '20 min from Bus Stand',
    timings: 'Open all day', entry: 'Free',
    category: 'Nature'
  },
  {
    id: 12, name: 'Dudh Talai Lake', image: dudhTalai, emoji: '🏔️',
    description: 'A serene lake near Machi Magra hills with a musical garden and ropeway for aerial views.',
    searchQuery: 'Fateh Sagar',
    lat: 24.5685, lng: 73.6836,
    stop: 'Dudh Talai Stop', time: '22 min from Bus Stand',
    timings: '8:00 AM - 8:00 PM', entry: '₹10 (Ropeway ₹70)',
    category: 'Nature'
  },
  {
  id: 13,
  name: 'Karni Mata Ropeway',
  image: karniMata,
  emoji: '🚠',
  description: 'A scenic ropeway ride offering panoramic views of Udaipur city, lakes, and surrounding hills.',
  searchQuery: 'Dudh Talai',
  lat: 24.5680,
  lng: 73.6840,
  stop: 'Dudh Talai Stop',
  time: '20 min from Bus Stand',
  timings: '9:00 AM - 9:00 PM',
  entry: '₹120',
  category: 'Adventure'
},
{
  id: 14,
  name: 'Shilpgram',
  image: shilpgram,
  emoji: '🎨',
  description: 'A traditional arts and crafts village showcasing Rajasthan’s rich cultural heritage.',
  searchQuery: 'Shilpgram',
  lat: 24.6390,
  lng: 73.7190,
  stop: 'Shilpgram Stop',
  time: '35 min from Bus Stand',
  timings: '11:00 AM - 7:00 PM',
  entry: '₹30',
  category: 'Culture'
},
{
  id: 15,
  name: 'Neemach Mata Temple',
  image: neemachMata,
  emoji: '🛕',
  description: 'A hilltop temple offering beautiful views of Fateh Sagar Lake and the city.',
  searchQuery: 'Fateh Sagar',
  lat: 24.6060,
  lng: 73.6800,
  stop: 'Neemach Mata Stop',
  time: '30 min from Bus Stand',
  timings: '6:00 AM - 8:00 PM',
  entry: 'Free',
  category: 'Religious'
},
{
  id: 16,
  name: 'Eklingji Temple',
  image: eklingji,
  emoji: '🕉️',
  description: 'One of the most famous Shiva temples in Rajasthan, located near Udaipur.',
  searchQuery: 'Eklingji',
  lat: 24.7480,
  lng: 73.7130,
  stop: 'Eklingji Stop',
  time: '45 min from Bus Stand',
  timings: '4:30 AM - 7:00 PM',
  entry: 'Free',
  category: 'Religious'
},
{
  id: 17,
  name: 'Ahar Cenotaphs',
  image: ahar,
  emoji: '🏛️',
  description: 'A historic complex containing royal cenotaphs of the Maharanas of Mewar.',
  searchQuery: 'Ahar',
  lat: 24.5710,
  lng: 73.7350,
  stop: 'Ahar Stop',
  time: '15 min from Bus Stand',
  timings: '8:00 AM - 6:00 PM',
  entry: '₹20',
  category: 'Heritage'
}
];

const categoryColors = {
  Heritage:   'bg-purple-100 text-purple-700',
  Nature:     'bg-green-100 text-green-700',
  Religious:  'bg-orange-100 text-orange-700',
  Garden:     'bg-pink-100 text-pink-700',
  Recreation: 'bg-blue-100 text-blue-700',
  Museum:     'bg-yellow-100 text-yellow-700',
};

// Haversine formula — real GPS distance in km
const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Walking time estimate
const walkTime = (km) => {
  const mins = Math.round((km / 5) * 60);
  return mins < 5 ? 'less than 5 min walk' : `~${mins} min walk`;
};

const Tourism = () => {
  const [selectedPlace, setSelectedPlace]       = useState(null);
  const [directRoutes, setDirectRoutes]         = useState([]);
  const [alternateRoutes, setAlternateRoutes]   = useState([]);
  const [loadingRoutes, setLoadingRoutes]       = useState(false);
  const [filter, setFilter]                     = useState('All');
  const navigate = useNavigate();

  const categories = ['All', ...new Set(places.map(p => p.category))];
  const filtered   = filter === 'All' ? places : places.filter(p => p.category === filter);

  useEffect(() => {
    if (!selectedPlace) {
      setDirectRoutes([]);
      setAlternateRoutes([]);
      return;
    }

    const fetchRoutes = async () => {
      setLoadingRoutes(true);
      setDirectRoutes([]);
      setAlternateRoutes([]);

      try {
        // Step 1: Search for direct routes
        const directData = await searchRoutes(selectedPlace.searchQuery);
        const direct = directData.success ? directData.routes : [];
        setDirectRoutes(direct);

        // Step 2: If no direct routes, find nearest stop across all routes
        if (direct.length === 0) {
          const allData = await getAllRoutes();
          if (!allData.success) return;

          let closestStop  = null;
          let closestRoute = null;
          let minDist      = Infinity;

          allData.routes.forEach(route => {
            route.stops.forEach(stop => {
              const dist = getDistance(
                selectedPlace.lat, selectedPlace.lng,
                stop.lat, stop.lng
              );
              if (dist < minDist) {
                minDist      = dist;
                closestStop  = {
                  ...stop,
                  distanceKm: dist.toFixed(2),
                  walkTime:   walkTime(dist),
                };
                closestRoute = route;
              }
            });
          });

          if (closestRoute) {
            setAlternateRoutes([{ route: closestRoute, stop: closestStop }]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingRoutes(false);
      }
    };

    fetchRoutes();
  }, [selectedPlace]);

  return (
    <>
      {/* Hero */}
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div
          className="w-full h-full flex items-center px-20"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.3) 100%)' }}
        >
          <div className="max-w-xl text-white">
            <span className="bg-[#f5a623] text-white text-xs font-bold tracking-widest px-4 py-2 rounded inline-block mb-5">
              HERITAGE TRANSIT
            </span>
            <h1 className="text-5xl font-extrabold leading-tight mb-4">
              Discover the <span className="text-[#f5a623]">Venice of the East</span>
            </h1>
            <p className="text-sm text-gray-300 leading-relaxed mb-8">
              Seamlessly navigate through marble palaces, shimmering lakes, and ancient bazaars.
              Safar Saathi connects you to the heart of Udaipur's regal legacy.
            </p>
            <button
              className="bg-[#f5a623] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e09400] transition-colors cursor-pointer"
              onClick={() => document.getElementById('attractions').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Destinations ↓
            </button>
          </div>
        </div>
      </div>

      {/* Attractions */}
      <div id="attractions" className="bg-gray-50 px-10 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-3">Popular Destinations</h2>
          <p className="text-sm text-gray-400 mb-6">
            Click any destination to see which bus routes you can take to get there
          </p>

          {/* Category filter */}
          <div className="flex gap-2 justify-center flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  filter === cat
                    ? 'bg-[#1a1a2e] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filtered.map((place) => (
            <div
  key={place.id}
  className="
  group
  bg-white
  rounded-3xl
  overflow-hidden
  shadow-md
  border-2
  border-transparent
  hover:border-[#f5a623]
  hover:-translate-y-3
  hover:shadow-2xl
  transition-all
  duration-500
  cursor-pointer
  "
  onClick={() => setSelectedPlace(place)}
>
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-110
                          transition-transform
                          duration-700
                          "/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span
  className={`
    absolute
    top-3
    right-3
    text-xs
    font-semibold
    px-3
    py-1
    rounded-full
    backdrop-blur-md
    shadow-md
    ${categoryColors[place.category]}
  `}
></span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{place.emoji}</span>
                  <h3 className="font-bold text-[#1a1a2e] text-sm">{place.name}</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{place.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">🕐 {place.time}</span>
                  <span className="text-xs text-[#f5a623] font-semibold">Explore Route →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Popup */}
      {selectedPlace && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-5"
          onClick={() => setSelectedPlace(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative h-56">
              <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover"/>
              <button
                className="absolute top-4 right-4 bg-white/90 text-gray-700 w-8 h-8 rounded-full font-bold hover:bg-white flex items-center justify-center"
                onClick={() => setSelectedPlace(null)}
              >✕</button>
              <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[selectedPlace.category]}`}>
                {selectedPlace.category}
              </span>
            </div>

            <div className="p-6">
              {/* Title */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{selectedPlace.emoji}</span>
                <h2 className="text-2xl font-extrabold text-[#1a1a2e]">{selectedPlace.name}</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">{selectedPlace.description}</p>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">⏰ Timings</p>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{selectedPlace.timings}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">🎟️ Entry Fee</p>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{selectedPlace.entry}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">🚏 Nearest Stop</p>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{selectedPlace.stop}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">🕐 Travel Time</p>
                  <p className="text-sm font-semibold text-[#1a1a2e]">{selectedPlace.time}</p>
                </div>
              </div>

              {/* Routes Section */}
              <div className="mb-5">
                {loadingRoutes ? (
                  <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3 animate-pulse"/>
                    <div className="bg-gray-100 rounded-xl h-20 animate-pulse"/>
                    <div className="bg-gray-100 rounded-xl h-20 animate-pulse"/>
                  </div>

                ) : directRoutes.length > 0 ? (
                  <>
                    <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">
                      🚌 Direct Bus Routes to {selectedPlace.name}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {directRoutes.map((route) => (
                        <div
                          key={route._id}
                          onClick={() => {
                            setSelectedPlace(null);
                            navigate('/routes', { state: { highlightRoute: route._id } });
                          }}
                          className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl p-3 cursor-pointer hover:bg-green-100 transition-colors"
                        >
                          <div className="bg-[#1a1a2e] text-white px-3 py-1 rounded-full text-xs font-bold flex-shrink-0">
                            Route {route.routeNumber}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#1a1a2e]">{route.name}</p>
                            <p className="text-xs text-gray-500">
                              🕐 Every {route.frequency} · 🚏 {route.stops.length} stops
                            </p>
                            {route.matchedStops?.length > 0 && (
                              <div className="flex gap-1 mt-1 flex-wrap">
                                {route.matchedStops.map((stop, i) => (
                                  <span key={i} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    ✅ {stop.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className="text-green-600 font-bold text-lg">›</span>
                        </div>
                      ))}
                    </div>
                  </>

                ) : alternateRoutes.length > 0 ? (
                  <>
                    {/* Warning banner */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                      <p className="text-xs font-semibold text-amber-700">
                        ⚠️ No direct bus route to {selectedPlace.name}
                      </p>
                      <p className="text-xs text-amber-600 mt-0.5">
                        Take the closest route and walk or take an auto from the nearest stop
                      </p>
                    </div>

                    <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">
                      🔀 Best Alternate Route
                    </h3>

                    {alternateRoutes.map(({ route, stop }, i) => (
                      <div key={i}>
                        {/* Route card */}
                        <div
                          onClick={() => {
                            setSelectedPlace(null);
                            navigate('/routes', { state: { highlightRoute: route._id } });
                          }}
                          className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl p-3 cursor-pointer hover:bg-orange-100 transition-colors mb-3"
                        >
                          <div className="bg-[#1a1a2e] text-white px-3 py-1 rounded-full text-xs font-bold flex-shrink-0">
                            Route {route.routeNumber}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#1a1a2e]">{route.name}</p>
                            <p className="text-xs text-gray-500">
                              🕐 Every {route.frequency} · 🚏 {route.stops.length} stops
                            </p>
                          </div>
                          <span className="text-[#f5a623] font-bold text-lg">›</span>
                        </div>

                        {/* Step by step instructions */}
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                          <p className="text-xs font-bold text-blue-800 mb-4">
                            📍 Step-by-step directions to {selectedPlace.name}:
                          </p>
                          <div className="flex flex-col gap-3">

                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 bg-[#1a1a2e] text-white rounded-full text-xs flex items-center justify-center flex-shrink-0 font-bold">1</div>
                              <div>
                                <p className="text-xs font-semibold text-gray-800">Board the bus</p>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  Take <strong>Route {route.routeNumber}</strong> — {route.name}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 bg-[#f5a623] text-white rounded-full text-xs flex items-center justify-center flex-shrink-0 font-bold">2</div>
                              <div>
                                <p className="text-xs font-semibold text-gray-800">Get off at nearest stop</p>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  Alight at <strong>"{stop.name}"</strong> stop
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 bg-green-500 text-white rounded-full text-xs flex items-center justify-center flex-shrink-0 font-bold">3</div>
                              <div>
                                <p className="text-xs font-semibold text-gray-800">Last stretch</p>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  From <strong>{stop.name}</strong>, it is <strong>{stop.distanceKm} km</strong> ({stop.walkTime}) to <strong>{selectedPlace.name}</strong>.
                                  You can walk or take a local auto-rickshaw.
                                </p>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    ))}
                  </>

                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-400">No routes found. Check back later.</p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => { setSelectedPlace(null); navigate('/routes'); }}
                  className="flex-1 py-3 bg-[#1a1a2e] text-white rounded-lg font-semibold hover:bg-[#f5a623] transition-colors cursor-pointer"
                >
                  🗺️ View All Routes
                </button>
                <button
                  onClick={() => { setSelectedPlace(null); navigate('/livemap'); }}
                  className="flex-1 py-3 bg-[#f5a623] text-white rounded-lg font-semibold hover:bg-[#e09400] transition-colors cursor-pointer"
                >
                  📍 Track Live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Tourism;