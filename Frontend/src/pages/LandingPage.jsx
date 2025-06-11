import React from 'react';
import { useNavigate } from "react-router-dom";
function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
        Task Manager
      </h1>

      <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-md sm:max-w-lg mb-6">
        Your productivity companion. Organize your work, prioritize, and achieve more.
      </p>

      <img
        src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
        alt="Task illustration"
        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-6"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded w-full sm:w-auto" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded w-full sm:w-auto" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
