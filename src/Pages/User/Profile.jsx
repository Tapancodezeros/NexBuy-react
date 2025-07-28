import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
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

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">User not found</div>;

  return (
    <div>
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">

      <br/>
      <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
        <FaUserCircle className="text-3xl text-blue-600" />
        
        Profile
      </h2>
      <div className="space-y-3 text-center">
        <img
          src={user.image}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border shadow"
        />
        <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Phone: {user.phone}</p>
        <p className="text-gray-600">Username: {user.username}</p>
      </div>
      <NavLink to="/">
        <button className="bg-red-600 text-white px-6 py-2 mt-6 rounded hover:bg-red-700 transition duration-200">
          Go Back
        </button>
      </NavLink>
      
    </div>

</div>
  );
};

export default Profile;
