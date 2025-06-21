import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const HostContext = createContext();

export const HostProvider = ({ children }) => {
  const [host, setHost] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("hostToken"));
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL;

  useEffect(() => {
    const tokenVerification = localStorage.getItem("hostToken");

    if (tokenVerification) {
      axios
        .get(`${backendUrl}/api/hosts/verify`, {
          headers: { token: tokenVerification },
        })
        .then((res) => {
          if (res.data.success) {
            setHost(res.data.host);
            setIsAuthenticated(true);
            setToken(tokenVerification);
          } else {
            toast.info(res.data.message);
            setToken(false);
            setIsAuthenticated(false);
          }
        })
        .catch((error) => {
          toast.error("Token invalid or expired:", error.message);
          setIsAuthenticated(false);
        });
    }
  }, [token]);

  const fetchListings = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/host/listings`, {
        headers: { token: token },
      });

      if (res.data.success) {
        setListings(res.data.listings);
      } else {
        toast.info(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchListings();
  }, [setListings, token]);

  const logout = () => {
    localStorage.removeItem("hostToken");
    setToken(null);
    setHost(null);
    setIsAuthenticated(false);
    toast.success("Logged out");
    navigate("/login");
  };

  const fetchBookings = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${backendUrl}/api/host/bookings`, {
        headers: {
          token: token,
        },
      });

      if (res.data.success) {
        setBookings(res.data.bookings);
      } else {
        toast.info(res.data.message);
      }
    } catch (error) {
      toast.error(`Error fetch bookings: ${error}`);
    }
  };

  useEffect(() => {
    fetchBookings();
    navigate("/login");
  }, []);

  const value = {
    host,
    setHost,
    backendUrl,
    token,
    setToken,
    isAuthenticated,
    logout,
    currency,
    listings,
    setListings,
    bookings,
    setBookings,
    fetchBookings,
    fetchListings,
  };

  return <HostContext.Provider value={value}>{children}</HostContext.Provider>;
};
