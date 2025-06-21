import { useContext, useEffect } from "react";
import { HostContext } from "../context/HostContext";
import { useNavigate } from "react-router-dom";

const HostProfile = () => {
  const { isAuthenticated, host, logout } = useContext(HostContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center transition-transform transform hover:scale-[1.02] duration-300 ease-in-out">
        <div className="flex justify-center mb-6">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${host?.name}`}
            alt="host avatar"
            className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-md"
          />
        </div>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-1 tracking-wide">
          Welcome, {host?.name}!
        </h2>

        <p className="text-gray-500 mb-4 italic">Superhost • Verified</p>

        {host?.email && (
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {host.email}
          </p>
        )}

        {host?.phone && (
          <p className="text-gray-700 mt-1">
            <span className="font-semibold">Phone:</span> {host.phone}
          </p>
        )}

        <button
          onClick={logout}
          className="mt-8 w-full py-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:brightness-105 active:scale-95 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HostProfile;
