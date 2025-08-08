import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formInputData = Object.fromEntries(formData.entries());
    localStorage.setItem("contactData", JSON.stringify(formInputData));
    toast.success("Your message has been submitted successfully!");
    e.target.reset();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-10">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-2">Contact Us</h2>
        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you. Please fill out the form below and our team will get back to you shortly.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              autoComplete="off"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="off"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              autoComplete="off"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-md p-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-200 font-semibold"
          >
            Send Message
          </button>
        </form>

        {/* Go Back Link */}
        <div className="mt-8 text-center">
          <NavLink to="/">
            <button className="bg-red-400 text-black px-6 py-2 rounded-lg hover:bg-red-500 transition">
              ⬅️ Back to Home
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Contact;
