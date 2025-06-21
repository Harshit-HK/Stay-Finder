import React, { useState, useEffect, useContext } from "react";
import { DateRange } from "react-date-range";
import { AppContext } from "../context/AppContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const BookingCalendar = () => {
  const { setStartDate, setEndDate, totalDays, setTotalDays } =
    useContext(AppContext);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const { startDate: localStart, endDate: localEnd } = dateRange[0];

    const formattedStart = localStart.toDateString();
    const formattedEnd = localEnd.toDateString();
    setStartDate(formattedStart);
    setEndDate(formattedEnd);

    const timeDiff = localEnd.getTime() - localStart.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setTotalDays(
      localStart.getTime() === localEnd.getTime() ? 1 : diffDays + 1
    );
  }, [dateRange, setStartDate, setEndDate]);

  return (
    <div className="p-4 shadow-xl rounded-xl hover:scale-105 translation-transform duration-300">
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setDateRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        minDate={new Date()}
      />

      <p className="mt-4 text-lg font-semibold">
        Stay Duration : {totalDays} {totalDays === 1 ? "Day" : "Days"}
      </p>
    </div>
  );
};

export default BookingCalendar;
