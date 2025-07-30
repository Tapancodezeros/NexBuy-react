import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500 text-lg animate-pulse">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-red-500 text-lg">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transition-all duration-500">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 flex items-center justify-center gap-2">
          <FaUserCircle className="text-4xl text-blue-600" />
          User Profile
        </h2>

        <div className="flex flex-col items-center space-y-3 text-center">
          <img
            src={user.image}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-300 shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-600 text-sm">📧 <span className="font-medium">Email:</span> {user.email}</p>
          <p className="text-gray-600 text-sm">📱 <span className="font-medium">Phone:</span> {user.phone}</p>
          <p className="text-gray-600 text-sm">👤 <span className="font-medium">Username:</span> {user.username}</p>
        </div>

        <div className="flex items-center justify-center mt-8">
          <NavLink to="/">
            <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 shadow-md">
              ⬅ Go Back
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Profile;
