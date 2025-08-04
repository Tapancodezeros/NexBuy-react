import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Contact = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formInputData = Object.fromEntries(formData.entries());
    localStorage.setItem("contactData", JSON.stringify(formInputData));
    toast.success("Message submitted successfully!");
    e.target.reset();
  };

  
  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white p-8 shadow-xl rounded-lg my-20">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <h2 className="text-4xl font-bold text-center text-red-500 mb-8">Contact Us</h2>

          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            name="username"
            required
            autoComplete="off"
          />

          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            name="email"
            required
            autoComplete="off"
          />

          <textarea
            className="w-full border border-gray-300 rounded-md p-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your message"
            name="message"
            required
            autoComplete="off"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
          >
            Send
          </button>
        </form>

        <div className="text-center mt-6 space-y-3">
          <NavLink to="/">
            <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600">
              ⬅️ Go Back
            </button>
          </NavLink>
          </div>
        </div>
    </section>
  );
};

export default Contact;
