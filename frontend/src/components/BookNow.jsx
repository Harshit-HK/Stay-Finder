import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const BookNow = ({ listing }) => {
  const { token, backendUrl, startDate, endDate, totalDays, currency } =
    useContext(AppContext);

  const text = `${totalDays} ${
    totalDays === 1 ? "Day" : "Days"
  } of stay : ${currency} ${totalDays * listing.price} only`;

  const handleStripePayment = async () => {
    try {
      if (!token) {
        toast.info("Please login to continue.");
        return;
      }

      const payload = {
        listingId: listing._id,
        title: listing.title,
        price: listing.price,
        totalDays,
        userId: listing.user,
        startDate,
        endDate,
      };

      const res = await axios.post(
        `${backendUrl}/api/bookings/stripe-session`,
        payload,
        { headers: { token: token } }
      );

      if (res.data.success) {
        window.location.href = res.data.url; // Redirect to Stripe
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Stripe payment error.");
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-xl font-semibold text-gray-800">{text}</p>

          <div className="w-full md:w-auto">
            <div className="border-t border-gray-300 pt-4">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                Payment Method
              </h2>

              <div className="flex items-center gap-2 mb-5">
                <input
                  type="radio"
                  id="stripe"
                  name="payment"
                  checked
                  className="accent-indigo-600 w-5 h-5"
                  readOnly
                />
                <label htmlFor="stripe" className="text-sm text-gray-600">
                  Pay with Stripe
                </label>
              </div>
            </div>

            <button
              className="w-full md:w-auto bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md"
              onClick={handleStripePayment}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookNow;
