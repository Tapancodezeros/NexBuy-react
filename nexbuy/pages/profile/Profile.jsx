"use client";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetchUserProfile } from "@/app/api/apiService";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLocalItem = (key) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };

  const userId = getLocalItem("userId");
  const token = getLocalItem("token");

  useEffect(() => {
    const getUserProfile = async () => {
      if (token === "local") {
        try {
          const localUser =
            typeof window !== "undefined" &&
            JSON.parse(localStorage.getItem("dummyUser"));

          if (localUser) {
            setUser({
              firstName: localUser.name,
              lastName: "",
              email: localUser.email,
              phone: localUser.phone,
              username: localUser.username,
              image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            });
          }
        } catch (err) {
          console.error("Error parsing local user:", err);
        }
        setLoading(false);
      } else {
        try {
          const data = await fetchUserProfile(userId);
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (userId && token) getUserProfile();
    else setLoading(false);
  }, [userId, token]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500 text-lg">
        User not found
      </div>
    );
  }

  const handleLogout = () => {
    toast.success("User logged out successfully", { autoClose: 1000 });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("contactData");
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-white flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transition-all duration-500">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 flex items-center justify-center gap-2">
          <FaUserCircle className="text-4xl text-blue-600" />
          User Profile
        </h2>

        {/* User Info */}
        <div className="flex flex-col items-center space-y-3 text-center">
          <img
            src={user.image}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-300 shadow-lg hover:scale-105 transition-transform duration-300"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-600 text-sm">
            📧 <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-600 text-sm">
            📱 <span className="font-medium">Phone:</span> {user.phone}
          </p>
          <p className="text-gray-600 text-sm">
            👤 <span className="font-medium">Username:</span> {user.username}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center mt-8 gap-4">
          <button
            onClick={() => router.back()}
            className="bg-gray-400 text-white px-6 py-2 rounded-full hover:bg-gray-500 transition duration-300 shadow-md"
          >
            ⬅️ Go Back
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
