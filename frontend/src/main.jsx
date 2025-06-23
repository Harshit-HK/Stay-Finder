import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContextProvider from "./context/AppContext";
// import { toast } from "react-toastify";

// const loadMapScript = async() => {

//   const script = document.createElement("script");

//   const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//   const goMapsKey = import.meta.env.VITE_GOMAPS_API_KEY;
//   const goMapsBase = import.meta.env.VITE_GOMAPS_BASE;

//   if (goMapsKey && goMapsBase) {
//     script.src = `${goMapsBase}?key=${goMapsKey}&libraries=places`;
//     console.log("Map is trigted")
//   } else if (googleKey) {
//      script.src = `${goMapsBase}?key=${googleKey}`;
//   } else {
//     toast.error("No Maps API key provided!");
//     return;
//   }

//   script.defer = true;
//   script.async = true;
//   script.id = "maps-script";
//   document.head.appendChild(script);
// };

// loadMapScript();

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
