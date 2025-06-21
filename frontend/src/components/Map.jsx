import { useEffect, useRef, useState } from "react";

const SearchableMap = ({lat, lng}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const defaultCenter = { lat: lat, lng: lng }; // Delhi

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 15,
    });

    const newMarker = new window.google.maps.Marker({
      map: mapInstance,
      position: defaultCenter,
    });

    setMap(mapInstance);
    setMarker(newMarker);
  }, []);

  return (
    <div className="relative w-[400px] h-[200px] rounded-xl shadow-lg overflow-hidden border border-gray-300">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-2 bg-white z-10 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          📍 Property Location
        </h2>
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ marginTop: "32px" }} // To push map below the top bar
      />
    </div>
  );
};

export default SearchableMap;
