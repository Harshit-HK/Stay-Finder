import { useContext } from "react";
import PropertyCard from "./PropertyCard";
import { AppContext } from "../context/AppContext";

const HomeFrontend = () => {
  const { listings, searchQuery } = useContext(AppContext);
  const query = searchQuery?.trim().toLowerCase() || "";

  const filteredListings = listings.filter((listing) =>
    [listing.title, listing.location, listing.description, String(listing.price)].some((field) =>
      field?.toLowerCase().includes(query)
    )
  );

  const showListings = query === "" ? listings : filteredListings;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Frontend demo listings use static data.</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-5">
        {showListings.length > 0 ? (
          showListings.map((listing) => (
            <PropertyCard key={listing._id} listing={listing} />
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

export default HomeFrontend;