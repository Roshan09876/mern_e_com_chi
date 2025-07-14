import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../api/api";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); // default to Login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currentState === "Sign Up") {
      try {
        const response = await registerApi({ name, email, password });
        const { token, user } = response.data;

        localStorage.clear();

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Register Successfull")
        navigate("/");

      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
        console.error("Login Error:", error);
      }
      setCurrentState("Login");
      setName("");
      setEmail("");
      setPassword("");

    } else {
      try {
        const response = await loginApi({ email, password });
        const { token, user } = response.data;
        localStorage.clear();

        // Save token
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login Successfull")
        navigate("/");
        window.location.reload()
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed. Please try again.");
        console.error("Login Error:", error);
      }

      setName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Enter your password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create a new account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-8 py-2 mt-4 font-light text-white bg-black"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
