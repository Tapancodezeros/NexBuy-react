import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formInputData = Object.fromEntries(formData.entries());
    localStorage.setItem("contactData", JSON.stringify(formInputData));
    toast.success("Your message has been submitted successfully!",{ autoClose: 1000 });
    e.target.reset();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100 p-8 md:p-12">
        <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-3 drop-shadow-sm">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-10">
          We'd love to hear from you. Fill out the form below and we'll get back to you shortly.
        </p>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              autoComplete="off"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="off"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-2"
            > Your Message  </label>
            <textarea
              id="message"
              name="message"
              required
              autoComplete="off"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg p-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-300"
          >🚀 Send Message</button>
        </form>
        <div className="mt-10 text-center">
          <NavLink to="/">
            <button className="bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:from-red-500 hover:to-red-600 transform hover:scale-105 transition-all duration-300">
              ⬅️ Back to Home
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Contact;
