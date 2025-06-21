import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated, user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center transition-transform transform hover:scale-[1.02] duration-300 ease-in-out">
        <div className="flex justify-center mb-4">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name} `}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-400"
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Hello, {user?.name}!
        </h2>

        {user?.email && (
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        )}

        {user?.phone && (
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
        )}

        <button
          onClick={logout}
          className="mt-6 w-full py-2 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>


    </div>
  );
};

export default Profile;
