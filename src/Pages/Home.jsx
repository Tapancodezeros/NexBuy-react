import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/UI/Header";
import { Footer } from "../components/UI/Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-200 to-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">🛍️ NexBuy</h1>
                <p className="text-xl md:text-2xl text-gray-700 max-w-xl mb-10">
          Experience the future of online shopping with <span className="font-semibold text-blue-600">NexBuy</span> — your next-generation e-commerce destination.
        </p> 
      </main>
      <Footer />
    </div>
  );
}

export default Home;
