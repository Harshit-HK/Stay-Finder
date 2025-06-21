import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContextProvider from "./context/AppContext";
import { toast } from "react-toastify";

const loadMapScript = () => {
  const existingScript = document.getElementById("maps-script");
  if (existingScript) return;

  const script = document.createElement("script");

  const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const goMapsKey = import.meta.env.VITE_GOMAPS_API_KEY;
  const goMapsBase = import.meta.env.VITE_GOMAPS_BASE;



  if (googleKey) {
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`;
  } else if (goMapsKey && goMapsBase) {
    script.src = `${goMapsBase}?key=${goMapsKey}&libraries=places`;
  } else {
    toast.error("No Maps API key provided!");
    return;
  }


  console.log("GOOGLE_KEY:", googleKey); // should be undefined or commented
console.log("GOMAPS_KEY:", goMapsKey); // should be available
console.log("Script loaded from:", script.src);


  script.defer = true;
  script.async = true;
  script.id = "maps-script";
  document.head.appendChild(script);
};

loadMapScript();

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
