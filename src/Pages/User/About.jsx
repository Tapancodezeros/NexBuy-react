import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userimg from "../../assets/images/Free.png";


const About = () => {
    const isLoggedIn = localStorage.getItem("token");
    const navigate = useNavigate();    
const handleClick = () => {
    navigate(isLoggedIn ? "/manageshop" : "/register");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-16 my-10">
      <section className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Sell with <span className="text-red-500">NexBuy</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Join thousands of entrepreneurs and businesses growing their brand 
          and reaching millions of customers across India.
        </p>
      </section>
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="flex justify-center">
          <img
            src={userimg}
            alt="NexBuy Seller"
            className="w-full max-w-md rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 object-cover h-auto"
          />
        </div>
        <div className="space-y-6 text-gray-800 leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Why Sell on NexBuy?
          </h2>
          <p>
            <strong>NexBuy</strong> provides a powerful e-commerce platform 
            for sellers of all sizes — from local artisans to established brands.
            Our mission is to help you reach more customers, increase sales, and 
            grow your business online.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Access to millions of active customers</li>
            <li>Easy-to-use seller dashboard</li>
            <li>Secure and fast payments</li>
            <li>Logistics & delivery support</li>
            <li>Advertising & promotional tools</li>
          </ul>
        </div>
      </main>
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-3">Reach More Customers</h3>
          <p className="text-gray-600">
            Tap into NexBuy’s growing network and showcase your products 
            to a nationwide audience.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-3">Hassle-Free Logistics</h3>
          <p className="text-gray-600">
            We take care of delivery so you can focus on what matters — growing your business.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
          <p className="text-gray-600">
            Get paid quickly and safely with our trusted payment system.
          </p>
        </div>
      </section>
      <section className="bg-red-500 text-white py-10 px-6 rounded-lg max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Start Selling?
        </h2>
        <p className="mb-6">
          Join NexBuy today and grow your business like thousands of other successful sellers.
        </p>      
          <button 
          onClick={handleClick}
          className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
          {isLoggedIn ? "Add shop" : "register first"}
          </button>        
      </section>
      <div className="mt-12 flex justify-center">
        <NavLink to="/">
          <button
           
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition duration-300">
            ⬅️ Back to Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default About;
