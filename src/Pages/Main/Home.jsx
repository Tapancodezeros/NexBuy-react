import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleClick = () => {
    navigate(isLoggedIn ? "/product" : "/login");
  };

  return (
    <div className="my-18">
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-white to-white px-4 py-20 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 drop-shadow-amber-700">
        🛍️ NexBuy
      </h1>

      <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mb-8 leading-relaxed">
        Experience the future of online shopping with <br />
        <span className="font-semibold text-blue-600">NexBuy</span>
        — your next-generation e-commerce destination.
      </p>

      <button
        onClick={handleClick}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-xl transition duration-300 shadow-lg"
      >
        {isLoggedIn ? "Browse Products" : "Login to Continue"}
      </button>
    </div>
    </div>
  );
}

export default Home;
