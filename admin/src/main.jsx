import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { HostProvider } from "./context/HostContext.jsx";
import { toast } from "react-toastify";

const loadMapScript = () => {
  const existingScript = document.getElementById("maps-script");
  if (existingScript) return;

  const script = document.createElement("script");

  const googleKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (googleKey) {
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places`;
  } else {
    toast.error("No Maps API key provided!");
    return;
  }

  script.defer = true;
  script.async = true;
  script.id = "maps-script";
  document.head.appendChild(script);
};

loadMapScript();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HostProvider>
      <App />
    </HostProvider>
  </BrowserRouter>
);
