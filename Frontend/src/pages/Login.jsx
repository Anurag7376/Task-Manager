import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const Login = () => {

  const { state } = useLocation();

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      const data = response.data;

      // console.log(data);
      // console.log(data.id);
      // console.log(data.token);
      
      
      

      enqueueSnackbar("Login Successful", { variant: "success" });

      localStorage.setItem("authToken", data.token);

      navigate(`/home/:${data.id}`, {
        state: {
          username: data.username,
        },
      });
    } catch (err) {
      enqueueSnackbar("Login failed", { variant: "error" });
      console.error(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin();
    setusername("");
    setPassword("");
  };

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center bg-blue-50 px-4">
        <div
          className="absolute top-10 left-20 text-3xl text-blue-700"
          onClick={() => navigate("/")}
        >
          <FaRegArrowAltCircleLeft />
        </div>
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 sm:p-10 md:p-12 border border-blue-300">
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-700 text-center mb-6">
            Login to Task Manager
          </h2>
          <form className="space-y-4" onSubmit={submitHandler}>
            <input
              required
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full border border-blue-400 text-base sm:text-lg outline-none bg-white py-3 px-5 rounded-full focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your Username"
            />
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-blue-400 text-base sm:text-lg outline-none bg-white py-3 px-5 rounded-full focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter password"
            />
            <button
              className="w-full bg-blue-600 text-white text-base sm:text-lg py-3 px-5 rounded-full hover:bg-blue-700 transition duration-300"
              type="submit"
            >
              Log in
            </button>
          </form>
          <div className="mt-6 text-center">
            Don't have an account?
            <span className="text-blue-800 cursor-pointer" onClick={() => navigate("/signUp")}>
              {" "}
              SignUp
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
