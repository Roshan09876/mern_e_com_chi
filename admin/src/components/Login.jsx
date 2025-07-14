import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { loginAdminApi } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await loginAdminApi({ email, password });
      const { token, user } = response.data;

      if (!user.isAdmin) {
        toast.error("Access denied! Only admins are allowed.");
        return;
      }

      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      toast.success("Admin Login Successful");

      navigate("/"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
      <div className="max-w-md w-full px-8 py-6 bg-white rounded-lg shadow-md">
        <div className="mb-4 text-center">
          <img src={assets.logo} alt="Trendify" className="mx-auto h-12" />
          <h1 className="mt-2 text-2xl font-bold">Admin Dashboard Login</h1>
        </div>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
