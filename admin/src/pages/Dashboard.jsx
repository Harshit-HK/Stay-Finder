import React from "react";

const Dashboard = () => {
  return (
<div className="bg-white p-6 rounded-xl shadow-md mt-8">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Analytics & Graphs</h2>
  <p className="text-gray-600">This section will show insights and visual charts related to host performance, property bookings, and revenue.</p>
  
  <div className="h-48 mt-4 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
    <span className="text-gray-400">[ Graphs/Charts Will Appear Here ]</span>
  </div>
</div>
  );
};

export default Dashboard;
