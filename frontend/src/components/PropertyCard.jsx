import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const PropertyCard = ({ listing }) => {
  const { currency } = useContext(AppContext);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/listing/${listing._id}`);
  };

  return (
    <div
      className="relative w-[100%] h-96 border rounded-2xl overflow-hidden shadow hover:shadow-lg hover:scale-105 transition"
      onClick={() => handleNavigate()}
    >
      <img
        src={listing.imageUrls[0]}
        alt={listing.title}
        className="w-full h-[75%] object-cover"
      />
      <div className="p-4 absolute bg-white bottom-2 w-full rounded-2xl">
        <h2 className="text-lg font-bold">{listing.title || "No Title"}</h2>
        <p className="text-sm text-gray-500">{listing.location}</p>
        <p className="text-md font-semibold mt-2">
          {currency}
          {listing.price ?? "N/A"}/night
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
