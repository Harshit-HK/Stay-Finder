import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HostContext } from "../context/HostContext";
import { useParams } from "react-router-dom";
import Map from "../components/Map";

const AddListing = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { listingId } = useParams();
  const { backendUrl, listings, setListings, token } = useContext(HostContext);

  //Add Property
  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // max 10MB size
    if (file.size > 10485760) {
      toast.error("Image too large. Max 10MB allowed.");
      return;
    }

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleAddImageField = () => {
    if (images.length < 5) {
      setImages([...images, null]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("lat", lat);
      formData.append("lng", lng);
      formData.append("address", address);

      // Only send new img
      images.forEach((img) => {
        if (img && typeof img !== "string") {
          formData.append("images", img);
        }
      });

      // Existing URLs (as string array)
      formData.append(
        "existingImages",
        JSON.stringify(images.filter((img) => typeof img === "string"))
      );

      let response;

      // Edit property details
      if (listingId) {
        response = await axios.put(
          `${backendUrl}/api/host/update/${listingId}`,
          formData,
          {
            headers: { token: token },
          }
        );
      } else {
        response = await axios.post(`${backendUrl}/api/host/add`, formData, {
          headers: {
            token: token,
          },
        });
      }

      if (response.data.success) {
        toast.success("Listing updates successfully");
        // update Listing section Without reload.
        setListings((prev) => [...prev, response.data.listing]);
        setTitle("");
        setDescription("");
        setLocation("");
        setPrice("");
        setImages([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(`Something went wrong ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  //Edit Property

  useEffect(() => {
    if (listingId) {
      const existing = listings.find((list) => list._id === listingId);
      if (existing) {
        setTitle(existing.title);
        setDescription(existing.description);
        setLocation(existing.location);
        setPrice(existing.price);
        setImages(existing.imageUrls || []);
      }
    }
  }, [listingId, listings]);

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 flex flex-col gap-4">
 
        <h2 className="text-xl font-bold">Add New Listing</h2>
        <div>
          <p className="font-medium mb-2">Upload Images</p>
          {/* Images fields. */}
          <div className="flex flex-wrap gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <label
                  htmlFor={`img-${index}`}
                  className="w-32 h-32 border-2 border-dashed rounded flex items-center justify-center text-sm text-gray-500 cursor-pointer hover:bg-gray-100 transition"
                >
                  {img ? (
                    <img
                      src={
                        typeof img === "string" ? img : URL.createObjectURL(img)
                      }
                      alt="preview"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    "Add image"
                  )}
                </label>
                <input
                  type="file"
                  id={`img-${index}`}
                  hidden
                  accept="image/*"
                  onClick={(e) => (e.target.value = null)} // to allow reselect
                  onChange={(e) => handleImageChange(index, e)}
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-red-200 hover:bg-red-300 text-white w-6 h-6 rounded-full text-sm"
                  onClick={() => handleRemoveImage(index)}
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImageField}
              className="w-24 h-24 border-2 border-dashed flex items-center justify-center text-gray-500 hover:border-gray-400"
            >
              +
            </button>
          </div>
        </div>

        {/* Text fields */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
          required
        />

<Map
  onLocationSelect={(lat, lng, addr) => {
    setLat(lat);
    setLng(lng);
    setAddress(addr);
  }}
/>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading
            ? "Please wait..."
            : `${listingId ? "Update Property" : "Add Property"}`}
        </button>
    </form>
  );
};

export default AddListing;
