import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";

import { HostContext } from "../context/HostContext";
import axios from "axios";

const HostListingDetail = () => {
  const { currency, listings, backendUrl, token } = useContext(HostContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const listing = listings.find((list) => list._id === id);
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      const res = await axios.delete(
        `${backendUrl}/api/host/delete/${listing._id}`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (res.data.success) {

        toast.success("Listing deleted");
        navigate("/listings");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to delete listing");
    }
  };

  if (!listing)
    return (
      <div className="pt-20 text-center text-xl font-medium text-gray-700">
        Loading listings...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow p-6 my-6 rounded-xl">
      <img
        src={listing.imageUrls?.[0]}
        alt={listing.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="grid grid-cols-2 gap-2 mt-4">
        {listing.imageUrls?.slice(1).map((img, i) => (
          <img key={i} src={img} className="h-40 w-full object-cover rounded" />
        ))}
      </div>

      <div className="mt-6">
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        <p className="text-gray-500">{listing.location}</p>
        <p className="text-xl font-semibold text-blue-700 mt-1">
          {currency}
          {listing.price} <span className="text-sm text-gray-400">/night</span>
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-1">Description</h2>
          <p className="text-gray-600">{listing.description}</p>
        </div>
        {listing.address && (
          <div>
          <strong>Address</strong> {listing.address}
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate(`/edit-listing/${listing._id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HostListingDetail;
