import { useState } from "react";
import { useMapEvents, Popup } from "react-leaflet";

export default function MapClickHandler() {
  const [position, setPosition] = useState(null);
  const [placeName, setPlaceName] = useState("Loading...");

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);
      setPlaceName("Loading...");

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        setPlaceName(
          data.display_name || "Unknown Location"
        );
      } catch (error) {
        setPlaceName("Location not found");
      }
    }
  });

  return position ? (
    <Popup position={position}>
      <div className="max-w-[250px]">
        <strong>📍 Location</strong>
        <br />
        {placeName}
      </div>
    </Popup>
  ) : null;
}