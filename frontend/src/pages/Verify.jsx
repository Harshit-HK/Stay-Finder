import React, { useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Verify = () => {
  const [params] = useSearchParams();
  const { token } = useContext(AppContext);

  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const verifyPayment = async () => {
    const success = params.get("success");
    const listingId = params.get("listingId") ;
    const userId = params.get("userId");
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const totalDays = params.get("totalDays");
    const totalPrice = params.get("totalPrice")

    try {
      const res = await axios.post(
        `${backendUrl}/api/bookings/verify`,
        {
          success,
          listingId,
          userId,
          startDate,
          endDate,
          totalPrice,
          totalDays,
        },
        { headers: {token: token } }
      );

      if (res.data.success) {

        toast.success("Booking confirmed!");
        navigate("/my-bookings");
      } else {
        toast.error(`Payment cancelled - ${res.data.message || ""}`);
          navigate(`/`);

      }
    } catch (err) {
      toast.error("Verification error");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="p-10 text-center text-xl font-semibold">
      Verifying payment...
    </div>
  );
};

export default Verify;
