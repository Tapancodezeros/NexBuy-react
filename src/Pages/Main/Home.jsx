import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); 

  const handleClick = () => {
    navigate(isLoggedIn ? "/product" : "/login");
  };

  return (
    <div className="min-h-screen flex flex-col-reverse justify-between bg-gradient-to-br from-blue-200 to-white">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 drop-shadow">
          🛍️ NexBuy
        </h1>

        <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mb-8 leading-relaxed">
          Experience the future of online shopping with <br/>
          <span className="font-semibold text-blue-600">NexBuy</span> — your
          next-generation e-commerce destination.
        </p>

        <button
          onClick={handleClick}
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          {isLoggedIn ? "Browse Products" : "Login to Continue"}
        </button>
      </main>

      <footer className="text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} NexBuy. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
