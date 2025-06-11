import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ username }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Task Manager</h1>
      {username && (
        <div className="text-sm">
          Welcome, <strong>{username}</strong>
        </div>
      )}
      <button
        className="text-white hover:text-gray-300 focus:outline-none"
        onClick={() => {
          localStorage.removeItem("authToken");
          navigate("/");
        }}
      >
        Log Out
      </button>
    </header>
  );
};

export default Header;
