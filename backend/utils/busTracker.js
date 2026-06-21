const WebSocket = require('ws');


const busFleet = [
  {
    id: 'BUS-101',
    routeNumber: '1',
    routeName: 'Balicha → Badgaon',
    waypoints: [
      { lat: 24.5502, lng: 73.6891 },
      { lat: 24.5560, lng: 73.6950 },
      { lat: 24.5769, lng: 73.7134 },
      { lat: 24.5820, lng: 73.7100 },
      { lat: 24.5848, lng: 73.7075 },
      { lat: 24.5862, lng: 73.7044 },
      { lat: 24.5871, lng: 73.7010 },
      { lat: 24.5880, lng: 73.6975 },
      { lat: 24.5860, lng: 73.6930 },
      { lat: 24.5840, lng: 73.6890 },
      { lat: 24.5800, lng: 73.6820 },
    ],
  },
  {
    id: 'BUS-102',
    routeNumber: '2',
    routeName: 'Badgaun → Titardi',
    waypoints: [
      { lat: 24.5800, lng: 73.6820 },
      { lat: 24.5840, lng: 73.6890 },
      { lat: 24.5860, lng: 73.6930 },
      { lat: 24.5880, lng: 73.6975 },
      { lat: 24.5900, lng: 73.7010 },
      { lat: 24.5871, lng: 73.7010 },
      { lat: 24.5862, lng: 73.7044 },
      { lat: 24.5848, lng: 73.7075 },
      { lat: 24.5950, lng: 73.7150 },
      { lat: 24.6000, lng: 73.7200 },
      { lat: 24.6050, lng: 73.7250 },
      { lat: 24.6100, lng: 73.7300 },
      { lat: 24.6150, lng: 73.7350 },
    ],
  },
  {
    id: 'BUS-103',
    routeNumber: '3',
    routeName: 'Dabok → Rampura',
    waypoints: [
      { lat: 24.6177, lng: 73.8961 },
      { lat: 24.6100, lng: 73.8500 },
      { lat: 24.6050, lng: 73.8100 },
      { lat: 24.5980, lng: 73.7800 },
      { lat: 24.5769, lng: 73.7134 },
      { lat: 24.5950, lng: 73.7150 },
      { lat: 24.5848, lng: 73.7075 },
      { lat: 24.5862, lng: 73.7044 },
      { lat: 24.5871, lng: 73.7010 },
      { lat: 24.5833, lng: 73.7026 },
      { lat: 24.5900, lng: 73.7010 },
      { lat: 24.5920, lng: 73.6960 },
      { lat: 24.6010, lng: 73.6870 },
      { lat: 24.5980, lng: 73.6820 },
      { lat: 24.5950, lng: 73.6780 },
      { lat: 24.5900, lng: 73.6750 },
    ],
  },
  {
    id: 'BUS-201',
    routeNumber: '4',
    routeName: 'Amberi → Savina',
    waypoints: [
      { lat: 24.6300, lng: 73.7500 },
      { lat: 24.6250, lng: 73.7400 },
      { lat: 24.6200, lng: 73.7300 },
      { lat: 24.6150, lng: 73.7200 },
      { lat: 24.5980, lng: 73.7800 },
      { lat: 24.5769, lng: 73.7134 },
      { lat: 24.6050, lng: 73.7400 },
      { lat: 24.5950, lng: 73.7150 },
      { lat: 24.6000, lng: 73.7300 },
      { lat: 24.6100, lng: 73.7100 },
      { lat: 24.6050, lng: 73.7120 },
    ],
  },
  {
    id: 'BUS-202',
    routeNumber: '5',
    routeName: 'Circular Route',
    waypoints: [
      { lat: 24.5833, lng: 73.6800 },
      { lat: 24.5870, lng: 73.6850 },
      { lat: 24.6050, lng: 73.7120 },
      { lat: 24.6100, lng: 73.7300 },
      { lat: 24.5950, lng: 73.7150 },
      { lat: 24.6050, lng: 73.7400 },
      { lat: 24.6100, lng: 73.7500 },
      { lat: 24.6050, lng: 73.7600 },
      { lat: 24.5980, lng: 73.7650 },
      { lat: 24.5900, lng: 73.7500 },
      { lat: 24.5862, lng: 73.7044 },
      { lat: 24.5848, lng: 73.7075 },
      { lat: 24.5820, lng: 73.7100 },
      { lat: 24.5769, lng: 73.7134 },
      { lat: 24.5560, lng: 73.6950 },
      { lat: 24.5833, lng: 73.6800 },
    ],
  },
];
const expandedFleet = [];

busFleet.forEach((bus) => {
  for (let i = 1; i <= 2; i++) {
    expandedFleet.push({
      ...bus,
      id: `${bus.id}-${i}`,
    });
  }
});
const busState = expandedFleet.map(bus => {
  const busNum = parseInt(bus.id.split('-').pop());

  return {
    ...bus,
    currentWaypointIndex: Math.floor(
      ((bus.waypoints.length - 2) * (busNum - 1)) / 4
    ),
    progress: Math.random(),
    direction: busNum % 2 === 0 ? -1 : 1,
    speed: 0.008 + Math.random() * 0.004,
    waiting: 0,
  };
});

const interpolate = (p1, p2, t) => ({
  lat: p1.lat + (p2.lat - p1.lat) * t,
  lng: p1.lng + (p2.lng - p1.lng) * t,
});

const moveBuses = () => {
  busState.forEach(bus => {
    if (bus.waiting > 0) {
  bus.waiting--;
  return;
}
    bus.progress += bus.speed * bus.direction;

    if (bus.progress >= 1) {
      bus.progress = 0;
      bus.currentWaypointIndex += bus.direction;

    if (bus.currentWaypointIndex >= bus.waypoints.length - 1) {
  bus.waiting = 5;
  bus.direction = -1;
  bus.currentWaypointIndex = bus.waypoints.length - 1;
}
      if (bus.currentWaypointIndex <= 0) {
  bus.waiting = 5;
  bus.direction = 1;
  bus.currentWaypointIndex = 0;
}
    }
  });
};

const getBusPositions = () => {
  return busState.map(bus => {
    const nextIndex = bus.currentWaypointIndex + bus.direction;
    const safeNext = Math.max(0, Math.min(bus.waypoints.length - 1, nextIndex));

    const position = interpolate(
      bus.waypoints[bus.currentWaypointIndex],
      bus.waypoints[safeNext],
      Math.max(0, Math.min(1, bus.progress))
    );

    return {
      id:          bus.id,
      routeNumber: bus.routeNumber,
      routeName:   bus.routeName,

          direction:
  bus.direction === 1
    ? "Towards Destination"
    : "Returning",
    
      lat:         parseFloat(position.lat.toFixed(6)),
      lng:         parseFloat(position.lng.toFixed(6)),
      nextStop:    bus.waypoints[safeNext],
      eta: Math.floor(Math.random() * 8) + 2,
      timestamp:   new Date().toISOString(),
      
    };
  });
};

const initWebSocket = (httpServer) => {
  const wss = new WebSocket.Server({ server: httpServer, path: '/ws/buses' });

  console.log('🔌 WebSocket ready at ws://localhost:5000/ws/buses');

  wss.on('connection', (ws) => {
    console.log('🚌 Client connected to live bus tracking');

    ws.send(JSON.stringify({ type: 'BUS_POSITIONS', buses: getBusPositions() }));

    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) ws.ping();
    }, 30000);

    ws.on('close', () => {
      clearInterval(pingInterval);
      console.log('📴 Client disconnected');
    });

    ws.on('error', (err) => console.error('WebSocket error:', err.message));
  });

  setInterval(() => {
    moveBuses();
    const data = JSON.stringify({ type: 'BUS_POSITIONS', buses: getBusPositions() });
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send(data);
    });
  }, 2000);

  return wss;
};

module.exports = { initWebSocket, getBusPositions };