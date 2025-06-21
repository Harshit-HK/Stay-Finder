import { useContext, useEffect } from "react";
import { HostContext } from "../context/HostContext";
import BookingCard from "../components/BookingCard";

const HostBookings = () => {
  const {bookings, fetchBookings} = useContext(HostContext)

 if (!bookings) {
    return (
      <div className="p-6 text-center text-red-500">Booking not found</div>
    );
  }

  useEffect(()=>{
    fetchBookings()
  },[])


  return (
    
<div>
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>

      <div className="flex flex-col gap-4">
        {[...bookings].reverse().map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
          />
        ))}
      </div>
    </div>
</div>
  );
};

export default HostBookings;
