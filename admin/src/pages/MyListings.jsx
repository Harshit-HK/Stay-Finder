import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HostContext } from "../context/HostContext";

const MyListings = () => {
  const { currency, listings, fetchListings } = useContext(HostContext);
  const navigate = useNavigate();

  useEffect(()=>{
    fetchListings()
  },[])

  const HandleNavigate = (id) => {
    navigate(`/listings/${id}`);

  };
  if(!listings) return <div className="text-red-400 font-semibold pt-20 flex justify-center ">No properties listed. Add a new property to get started.</div>

  return (
    <div className="p-6 hide">
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            onClick={(e) => {
              HandleNavigate(listing._id);
            }}
            className="border rounded-lg overflow-hidden shadow"
          >
            <img
              src={listing.imageUrls?.[0]}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold">{listing.title}</h3>
              <p className="text-sm text-gray-500">{listing.location}</p>
              <p className="text-sm text-gray-700 mt-1">
                {listing.description}
              </p>
              <p className="text-blue-600 font-semibold mt-2">
                {currency}
                {listing.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
