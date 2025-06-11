import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", form);
      enqueueSnackbar("Sign Up Successful!", { variant: "success" });
      navigate("/login");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Sign Up Failed", { variant: "error" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 px-4">
      <div
        className="absolute top-10 left-20 text-3xl text-blue-700"
        onClick={() => navigate("/")}
      >
        <FaRegArrowAltCircleLeft />
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 sm:p-10 md:p-12 border border-blue-300">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center mb-6">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Your Username"
            className="w-full border border-blue-400 text-base sm:text-lg py-3 px-5 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            required
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="w-full border border-blue-400 text-base sm:text-lg py-3 px-5 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            required
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full border border-blue-400 text-base sm:text-lg py-3 px-5 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-base sm:text-lg py-3 px-5 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-800 hover:underline cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
