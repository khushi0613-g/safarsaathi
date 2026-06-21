// FetchRoadGeometry.jsx

export async function fetchRoadPath(stops) {
  const coordsParam = stops.map(s => `${s.lng},${s.lat}`).join(';');
  const url = `https://router.project-osrm.org/route/v1/driving/${coordsParam}?overview=full&geometries=geojson`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.routes && data.routes[0]) {
      return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    }
  } catch (err) {
    console.error('OSRM fetch failed, falling back to straight line:', err);
  }
  return stops.map(s => [s.lat, s.lng]);
}