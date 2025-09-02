"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []); 

  const handleClick = () => {
    router.push(isLoggedIn ? "/product" : "/Auth/login"); 
 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-white to-white px-4 py-20 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 drop-shadow">
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
  );
}

export default Home;
