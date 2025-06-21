import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken, backendUrl } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // --------------------------

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Allow only digits
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      backendUrl + (isLogin ? "/api/auth/login" : "/api/auth/register");

      const payload = isLogin
        ? { email, password }
        : { name, phone, email, password };

    try {
      const res = await axios.post(url, payload);

      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        
        localStorage.setItem("StayFinder_token", res.data.token);
        toast.success(res.data.message);
        navigate("/profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login to StayFinder" : "Register on StayFinder"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              className="w-full border rounded p-2 mb-4"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          {!isLogin && (
            <input
              type="tel"
              className="w-full border rounded p-2 mb-4"
              placeholder="Number"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          )}

          <input
            type="email"
            className="w-full border rounded p-2 mb-4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border rounded p-2 mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
