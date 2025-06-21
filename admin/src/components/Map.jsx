import { useEffect, useRef, useState } from "react";

const Map = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const latlng = { lat: latitude, lng: longitude };

      map.setCenter(latlng);
      map.setZoom(15);
      marker.setPosition(latlng);

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          const resultAddr = results[0].formatted_address;
          setAddress(resultAddr);

          // 🔥 Send data to parent
          if (onLocationSelect) {
            onLocationSelect(latitude, longitude, resultAddr);
          }
        }
      });
    });
  };

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const defaultCenter = { lat: 28.6139, lng: 77.209 }; // Delhi

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 4,
    });

    const newMarker = new window.google.maps.Marker({
      map: mapInstance,
      position: defaultCenter,
    });
    
    setMap(mapInstance);
    setMarker(newMarker);
  }, []);

  return (
    <div className="relative  h-[300px] rounded-xl shadow-lg overflow-hidden border border-gray-300">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center p-2 bg-white z-10 border-b">
        <h2 className="text-sm font-semibold text-gray-700">
          📍 Property Location
        </h2>
        <button
        type="button"
          onClick={handleUseCurrentLocation}
          className="text-xs bg-blue-100 hover:bg-blue-500 hover:text-white text-blue-700 px-2 py-1 rounded-md transition-all duration-200"
        >
          Use My Location
        </button>
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ marginTop: "32px" }} // To push map below the top bar
      />

      {address && (
        <div className="absolute bottom-2 left-2 bg-white p-1 rounded text-xs shadow">
          <p>
            <strong>Address:</strong> {address}
          </p>
        </div>
      )}
    </div>
  );
};

export default Map;
