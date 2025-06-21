import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { listings } from "../data/listingsData";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

  // User & token management
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("StayFinder_token"));

  // Calendar & date
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(1);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // is user Authenticated
  const isAuthenticated = !!token;

  useEffect(() => {
    const tokenVerification = localStorage.getItem("StayFinder_token");

    if (tokenVerification) {
      axios
        .get(`${backendUrl}/api/auth/verify`, {
          headers: { token: tokenVerification },
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            setToken(tokenVerification);
          } else {
            localStorage.removeItem("StayFinder_token");
          }
        })
        .catch((err) => {
          toast.error("Token invalid or expired:", err.message);
          localStorage.removeItem("StayFinder_token");
          setUser(null);
          setToken(null);
        });
    }
  }, []);

  const logout = () => {
    setToken("");
    localStorage.removeItem("StayFinder_token");
    setUser(null);
  };

  const value = {
    token,
    listings,
    backendUrl,
    isAuthenticated,
    setToken,
    user,
    setUser,
    currency,
    logout,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    totalDays,
    setTotalDays,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
