import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import MapClickHandler from "./MapClickHandler";
import { fetchRoadPath } from './FetchRoadGeometry';


// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [35,35],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

const stopIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

// Real Udaipur route lines to draw on map
const routeLines = [
  {
    id: 'R1', number: '1',
    name: 'Balicha → Badgaon',
    color: '#22247c',
    stops: [
      { name: 'Balicha',           lat: 24.5502, lng: 73.6891 },
      { name: 'Sec 14',            lat: 24.5560, lng: 73.6950 },
      { name: 'Railway Station',   lat: 24.5769, lng: 73.7134 },
      { name: 'Udaipole',          lat: 24.5820, lng: 73.7100 },
      { name: 'Surajpole',         lat: 24.5848, lng: 73.7075 },
      { name: 'Delhi Gate',        lat: 24.5862, lng: 73.7044 },
      { name: 'Court Choraha',     lat: 24.5871, lng: 73.7010 },
      { name: 'Sukhadiya Circle',  lat: 24.5880, lng: 73.6975 },
      { name: 'Fatehpura Circle',  lat: 24.5860, lng: 73.6930 },
      { name: 'Syphon Circle',     lat: 24.5840, lng: 73.6890 },
      { name: 'Badgaon',           lat: 24.5800, lng: 73.6820 },
    ]
  },
  {
    id: 'R2', number: '2',
    name: 'Badgaun → Titardi',
    color: '#2d2d52',
    stops: [
      { name: 'Badgaun',          lat: 24.5800, lng: 73.6820 },
      { name: 'Syphon Circle',    lat: 24.5840, lng: 73.6890 },
      { name: 'Fatehpura Circle', lat: 24.5860, lng: 73.6930 },
      { name: 'Chetak Circle',    lat: 24.5900, lng: 73.7010 },
      { name: 'Delhi Gate',       lat: 24.5862, lng: 73.7044 },
      { name: 'Surajpole',        lat: 24.5848, lng: 73.7075 },
      { name: 'Seva Ashram',      lat: 24.5950, lng: 73.7150 },
      { name: 'Sector 4',         lat: 24.6050, lng: 73.7250 },
      { name: 'Sector 6',         lat: 24.6100, lng: 73.7300 },
      { name: 'Titardi',          lat: 24.6150, lng: 73.7350 },
    ]
  },
  {
    id: 'R3', number: '3',
    name: 'Dabok → Rampura',
    color: '#584048',
    stops: [
      { name: 'Dabok',            lat: 24.6177, lng: 73.8961 },
      { name: 'Debari',           lat: 24.6100, lng: 73.8500 },
      { name: 'Transport Nagar',  lat: 24.6050, lng: 73.8100 },
      { name: 'Pratapnagar',      lat: 24.5980, lng: 73.7800 },
      { name: 'Railway Station',  lat: 24.5769, lng: 73.7134 },
      { name: 'Delhi Gate',       lat: 24.5862, lng: 73.7044 },
      { name: 'MB Hospital',      lat: 24.5833, lng: 73.7026 },
      { name: 'Chetak Circle',    lat: 24.5900, lng: 73.7010 },
      { name: 'Fateh Sagar',      lat: 24.6010, lng: 73.6870 },
      { name: 'Rampura Chowk',    lat: 24.5900, lng: 73.6750 },
    ]
  },
  {
    id: 'R4', number: '4',
    name: 'Amberi → Savina',
    color: '#42613e',
    stops: [
      { name: 'Amberi',           lat: 24.6300, lng: 73.7500 },
      { name: 'Sukher',           lat: 24.6250, lng: 73.7400 },
      { name: 'Bhuvana Bypass',   lat: 24.6200, lng: 73.7300 },
      { name: 'R.T.O.',           lat: 24.6150, lng: 73.7200 },
      { name: 'Pratap Nagar',     lat: 24.5980, lng: 73.7800 },
      { name: 'Railway Station',  lat: 24.5769, lng: 73.7134 },
      { name: 'Seva Ashram',      lat: 24.5950, lng: 73.7150 },
      { name: 'Hiran Magri',      lat: 24.6100, lng: 73.7100 },
      { name: 'Savina Circle',    lat: 24.6050, lng: 73.7120 },
    ]
  },
  {
    id: 'R5', number: '5',
    name: 'Circular Route',
    color: '#6a1b9a',
    stops: [
      { name: 'Chungi Naka',       lat: 24.5833, lng: 73.6800 },
      { name: 'CA Circle',         lat: 24.5870, lng: 73.6850 },
      { name: 'Savina',            lat: 24.6050, lng: 73.7120 },
      { name: 'Seva Ashram',       lat: 24.5950, lng: 73.7150 },
      { name: 'Thokar',            lat: 24.6050, lng: 73.7400 },
      { name: 'University Gate',   lat: 24.6050, lng: 73.7600 },
      { name: 'Lake City Mall',    lat: 24.5980, lng: 73.7650 },
      { name: 'Shastri Circle',    lat: 24.5900, lng: 73.7500 },
      { name: 'Delhi Gate',        lat: 24.5862, lng: 73.7044 },
      { name: 'Surajpole',         lat: 24.5848, lng: 73.7075 },
      { name: 'Railway Station',   lat: 24.5769, lng: 73.7134 },
      { name: 'Chungi Naka',       lat: 24.5833, lng: 73.6800 },
    ]
  },
];

const LiveMap = () => {
  const [buses, setBuses] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  // Connect to WebSocket for live bus positions
  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket('ws://localhost:5000/ws/buses');
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        console.log('🔌 Connected to live bus tracking');
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'BUS_POSITIONS') {
          setBuses(data.buses);
        }
      };

      ws.onclose = () => {
        setConnected(false);
        // Reconnect after 3 seconds
        setTimeout(connect, 3000);
      };

      ws.onerror = () => ws.close();
    };

    connect();
    return () => wsRef.current?.close();
  }, []);

  const displayRoutes = selectedRoute
    ? routeLines.filter(r => r.number === selectedRoute)
    : routeLines;

  const displayBuses = selectedRoute
    ? buses.filter(b => b.routeNumber === selectedRoute)
    : buses;
    const [routePaths, setRoutePaths] = useState({});

useEffect(() => {
  async function loadPaths() {
    const paths = {};
    for (const route of displayRoutes) {
      paths[route.id] = await fetchRoadPath(route.stops);
    }
    setRoutePaths(paths);
  }
  if (displayRoutes.length) loadPaths();
}, [displayRoutes]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-[#1a1a2e] text-white px-10 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold mb-1">🗺️ Smart City Bus Tracking System</h1>
            <p className="text-sm text-gray-400">Real-time bus locations across Udaipur city</p>
            <p className="text-xs text-green-300 mt-1">
Updated every 2 seconds
</p>
          </div>
          <div className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full ${
            connected ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`}/>
            {connected ? 'Live' : 'Connecting...'}
          </div>
        </div>
      </div>

      {/* Route Filter */}
      <div className="bg-white px-10 py-4 shadow-sm flex gap-3 flex-wrap items-center">
        <span className="text-sm font-semibold text-gray-600">Filter:</span>
        <button
          onClick={() => setSelectedRoute(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
            !selectedRoute ? 'bg-[#1a1a2e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Routes
        </button>
        {routeLines.map(route => (
          <button
            key={route.id}
            onClick={() => setSelectedRoute(selectedRoute === route.number ? null : route.number)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer`}
            style={{
              backgroundColor: selectedRoute === route.number ? route.color : '#f3f4f6',
              color: selectedRoute === route.number ? 'white' : '#4b5563',
            }}
          >
            Route {route.number}
          </button>
        ))}
      </div>

      <div className="flex flex-1">
        {/* Map */}
        <div
  className="flex-1 overflow-hidden rounded-3xl shadow-2xl border border-gray-200"
  style={{ height: 'calc(100vh - 180px)' }}
><div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">

  <div className="bg-white rounded-2xl p-4 shadow-md">
    <p className="text-sm text-gray-500">Active Buses</p>
    <h3 className="text-2xl font-bold text-green-600">
      {buses.length} buses
    </h3>
  </div>

  <div className="bg-white rounded-2xl p-4 shadow-md">
    <p className="text-sm text-gray-500">Routes</p>
    <h3 className="text-2xl font-bold">
      {routeLines.length}
    </h3>
  </div>

  <div className="bg-white rounded-2xl p-4 shadow-md">
    <p className="text-sm text-gray-500">Stops</p>
    {routeLines.reduce((a,r)=>a+r.stops.length,0)}
  </div>

  <div className="bg-white rounded-2xl p-4 shadow-md">
    <p className="text-sm text-gray-500">Status</p>
    <h3 className="text-2xl font-bold text-green-600">
      Live
    </h3>
  </div>

</div>
          <MapContainer
            center={[24.5854, 73.7125]}
  zoom={13}
style={{ width: '100%', height: '100%' }}
          >
            
            <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
/>

            {/* Draw route lines and stops */}
            {displayRoutes.map(route => (
              <React.Fragment key={route.id}>
                {/* Outline (white, underneath) */}
{/* White outline (drawn first, underneath) */}
<Polyline
  positions={route.stops.map(s => [s.lat, s.lng])}
  color="#ffffff"
  weight={8}
  opacity={0.9}
  lineCap="round"
  lineJoin="round"
/>

{/* Colored line on top */}
<Polyline
  positions={route.stops.map(s => [s.lat, s.lng])}
  color={route.color}
  weight={5}
  opacity={1}
  lineCap="round"
  lineJoin="round"
/>

                {route.stops.map((stop, i) => (
                  <Marker key={i} position={[stop.lat, stop.lng]} icon={stopIcon}>
                    <Popup>
                      <div className="text-sm">
                        <p className="font-bold text-[#1a1a2e]">🚏 {stop.name}</p>
                        <p className="text-gray-500 text-xs">{route.name}</p>
                        
                      </div>
                    </Popup>
                  </Marker>
                  
                ))}
              </React.Fragment>
            ))}

            {/* Live buses from WebSocket */}
            {displayBuses.map(bus => (
              <Marker
  key={bus.id}
  position={[bus.lat, bus.lng]}
  icon={busIcon}
>
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold text-[#1a1a2e]">🚌 {bus.id}</p>
                    <p className="text-gray-600 text-xs">{bus.routeName}</p>
                    <p className="text-green-600 text-xs font-semibold mt-1">● Live</p>
                    <p className="text-xs text-blue-600">
🚏 Next Stop: {bus.nextStop?.name || "Upcoming"}
</p>

<p className="text-xs text-orange-600">
⏳ ETA: {bus.eta} min
</p>
                    <p className="text-gray-400 text-xs">
                      <p className="text-blue-600 text-xs">
  {bus.direction}
</p>
                      {new Date(bus.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Sidebar */}
        <div className="w-72 bg-white shadow-lg overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
          <div className="p-4 border-b">
            <h2 className="font-bold text-[#1a1a2e] text-sm">
              Active Buses ({buses.length})
            </h2>
          </div>

          {routeLines.map(route => {
            const routeBuses = buses.filter(b => b.routeNumber === route.number);
            return (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(selectedRoute === route.number ? null : route.number)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50
hover:shadow-lg
hover:-translate-y-1
transition-all
duration-300${
                  selectedRoute === route.number ? 'bg-orange-50 border-l-4' : ''
                }`}
                style={selectedRoute === route.number ? { borderLeftColor: route.color } : {}}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: route.color }}/>
                  <span className="text-xs font-bold text-[#1a1a2e]">Route {route.number}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-auto">
                    {routeBuses.length} bus
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{route.name}</p>
                <p className="text-xs text-gray-400">🚏 {route.stops.length} stops</p>
              </div>
            );
          })}

          {/* Legend */}
          <div className="p-4">
            <h3 className="font-bold text-[#1a1a2e] text-sm mb-3">Legend</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <img src="https://cdn-icons-png.flaticon.com/512/3448/3448339.png" className="w-5 h-5" alt="bus"/>
                <span>Live Bus Location</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" className="w-5 h-5" alt="stop"/>
                <span>Bus Stop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;