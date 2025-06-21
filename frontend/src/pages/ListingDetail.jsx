import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BookingCalendar from "../components/BookingCalendar";
import BookNow from "../components/BookNow";
import axios from "axios";
import { toast } from "react-toastify";
import Map from "../components/Map";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const { currency, listings, backendUrl } = useContext(AppContext);

  const find = async () => {
    // Try to find in AppContext
    const found = listings.find((item) => item._id === id);
    if (found) {
      setListing(found);
    } else {
      // If not found, fetch from backend
      try {
        const res = await axios.get(`${backendUrl}/api/listings/${id}`);
        if (res.data.success) {
          setListing(res.data.listing);
        } else {
          toast.info("No listing found");
        }
      } catch (error) {
        toast.error(`Error fetching from backend:${error.message}`);
      }
    }
  };

  useEffect(() => {
    find();
  }, [id, listings]);

  if (!listing) return <div className="p-4">Listing not found</div>;
  const facilities = ["Free WiFi", "AC & Heating", "Private Balcony"];

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-zinc-100 p-6 rounded-xl shadow-lg my-6">
        <img
          src={listing.imageUrls[0]}
          alt={listing.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="grid grid-cols-2 gap-2 mt-4">
          {listing.imageUrls?.slice(1).map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-40 w-full object-cover rounded"
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mt-4">{listing.title}</h1>
            <p className="text-gray-500">{listing.location}</p>
            <p className="text-xl font-bold">
              {currency}
              {listing.price}{" "}
              <span className="text-gray-500 text-sm">/night</span>
            </p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">About this place</h2>
              <p className="text-gray-700">{listing.description}</p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                {facilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* map section*/}

            {listing.lat && listing.lng && (
              <Map lat={listing.lat} lng={listing.lng} />
            )}
          </div>
          <div className="flex-1">
            <BookingCalendar />
          </div>
        </div>

        <BookNow listing={listing} />
      </div>
    </div>
  );
};

export default ListingDetail;
