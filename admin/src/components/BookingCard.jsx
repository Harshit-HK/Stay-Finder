import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const image = booking?.listing?.imageUrls?.[0];
  const title = booking?.listing?.title;
  const user = booking?.user?.name;

  return (
    <div
      className="flex items-center gap-4 border rounded-lg shadow-sm p-4 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 hover:from-yellow-200 hover:via-pink-200 hover:to-purple-200 cursor-pointer transition-colors"
      onClick={() => navigate(`/bookings/${booking._id}`)}
    >
      <img
        src={image}
        alt={title}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>

      <div className="text-right text-sm text-gray-600">
        <p>Booked by:</p>
        <p className="font-medium">{user}</p>
      </div>
    </div>
  );
};

export default BookingCard;
