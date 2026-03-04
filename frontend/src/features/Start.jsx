import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {

    const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-600 to-indigo-600 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 w-full max-w-md text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Welcome 👋
        </h1>

        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Start your journey by logging in or creating a new account.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition duration-200"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg font-medium transition duration-200"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
