import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const HomeBackend = () => {
  const { backendUrl, currency ,searchQuery} = useContext(AppContext);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/listings`);
        setListings(res.data.listings || []);
      } catch (err) {
        console.error("Backend listings fetch failed", err);
      }
    };

    fetchListings();
  }, [backendUrl]);

  const query = searchQuery.trim().toLowerCase();

  const filteredListings = listings.filter((listing) =>
    [listing.title, listing.location, listing.description, String(listing.price)].some((field) =>
      field?.toLowerCase().includes(query)
    )
  );

  const showListings = query === "" ? listings : filteredListings;

  const handleNavigate = (id) => {
    navigate(`/listing/${id}`);
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4 text-center">Property listings fetched dynamically via MongoDB backend integration.</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {showListings.length > 0 ? (
          [...showListings].reverse().map((listing) => (
            <div
              key={listing._id}
              onClick={() => handleNavigate(listing._id)}
              className="relative w-full h-96 border rounded-2xl overflow-hidden shadow hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              
              <img
                src={listing.imageUrls?.[0]}
                alt={listing.title}
                className="w-full h-[75%] object-cover"
                
              />
              <div className="p-4 absolute bg-white bottom-2 w-full rounded-2xl">
                <h2 className="text-lg font-bold">
                  {listing.title || "No Title"}
                </h2>
                <p className="text-sm text-gray-500">
                  {listing.location || "Unknown"}
                </p>
                <p className="text-md font-semibold mt-2">
                  {currency}
                  {listing.price ?? "N/A"}/night
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No listings found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeBackend;
