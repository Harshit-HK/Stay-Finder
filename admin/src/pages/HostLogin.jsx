import React, { useContext, useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { HostContext } from "../context/HostContext";

const HostLogin = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const { backendUrl, isAuthenticated, setHost, setToken } = useContext(HostContext);


  useEffect(()=>{
    isAuthenticated? navigate('/'): ""
  },[])

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      backendUrl + (isLogin ? "/api/hosts/login" : "/api/hosts/register");
    const payload = isLogin
      ? { email, password }
      : { name, phone, email, password };

    try {
      const res = await axios.post(url, payload);
      if (res.data.success) {
        setToken(res.data.token);
        setHost(res.data.host)
        localStorage.setItem("hostToken", res.data.token);
        toast.success(res.data.message);
        navigate("/");
      } else {

        toast.error(res.data.message);
      }
    } catch (error) {
      toast.message("Something went wrong", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Host Login" : "Host Registration"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                className="w-full border rounded p-2 mb-4"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="tel"
                className="w-full border rounded p-2 mb-4"
                placeholder="Phone"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
            </>
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
            {isLogin ? "Login" : "Register"}
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

export default HostLogin;
