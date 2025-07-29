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

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">User not found</div>;

  return (
    <div className="min-h-svh bg-gray-200 flex items-center justify-center px-18">
      <div className="w-full max-w-md bg-blue-100 rounded-xl shadow-purple-700 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <FaUserCircle className="text-3xl text-blue-600" />
          Profile
        </h2>

        <div className="flex flex-col items-center space-y-3 text-center">
          <img
            src={user.image}
            alt="Profile"
            className="w-28 h-28 rounded-full border-2 border-blue-200 shadow-md"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-600">📧 Email: {user.email}</p>
          <p className="text-gray-600">📱 Phone: {user.phone}</p>
          <p className="text-gray-600">👤 Username: {user.username}</p>
        </div>

        <div className="mt-6 text-center">
         <NavLink to="/">
          <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
              Go Back
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Profile;
