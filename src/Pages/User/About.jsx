import React from "react";
import { NavLink } from "react-router-dom";
import userimg from "../../assets/images/Free.png";

const About = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-5 md:px-16">
      {/* Content Container */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start my-10">
        
        {/* Left: Image */}
        <div className="flex justify-center">
          <img
            src={userimg}
            alt="NexBuy Team"
            className="w-full max-w-md rounded-lg shadow-md"
          />
        </div>

        {/* Right: Description */}
        <div className="space-y-6 text-gray-800">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About NexBuy
          </h1>

          <p>
            <strong>NexBuy</strong> is a customer-centric online marketplace built with a mission to make online shopping fast, reliable, and affordable for everyone. We are committed to delivering value, convenience, and trust — every single day.
          </p>

          <p>
            Founded by a team passionate about innovation and technology, NexBuy connects millions of users with a wide array of products across categories like electronics, fashion, home & kitchen, beauty, and more.
          </p>

          <p>
            Our core philosophy is inspired by global leaders in e-commerce: 
            <strong> Customer obsession, operational excellence, and constant innovation.</strong>
            Every feature we build, every policy we implement, is designed to improve your shopping experience.
          </p>

          <p>
            With secure payments, real-time order tracking, 24/7 support, and reliable delivery networks, NexBuy aims to become the most trusted shopping destination across the country.
          </p>

          <p>
            We also believe in empowering local businesses and vendors by providing them a digital platform to grow and thrive in the modern economy.
          </p>

          <p>
            As we continue to expand, our goal remains simple: deliver the best possible experience to every customer, every order, every time.
          </p>

          <p className="text-gray-600 italic">
            NexBuy — Trusted by everyone.
          </p>
        </div>
      </main>

      {/* Back Button */}
      <div className="mt-12 flex justify-center">
        <NavLink to="/">
          <button className="bg-red-500 hover:bg-red-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-300">
            ⬅️ Back to Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default About;
