"use client";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaUserTag, FaIdCard, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { getOneUser } from "@/app/api/apiService";
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
      if (!userId || !token) {
        setLoading(false);
        return;
      }
      try {
        // Assume getOneUser fetches full user details based on ID/token context
        const data = await getOneUser(userId); 
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) getUserProfile();
    else setLoading(false);
  }, [userId, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-indigo-600 text-xl font-medium flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading profile details...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-red-50 p-6 rounded-xl border border-red-300 text-red-700 text-xl font-medium">
            User data is missing or invalid. Please log in again.
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    toast.success("User logged out successfully", { autoClose: 1000 });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userShopIds");
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white shadow-3xl rounded-3xl p-10 border border-gray-200 transition-all duration-500 transform hover:shadow-indigo-300/50">
        
       

        {/* Profile Picture */}
        <div className="flex justify-center -mt-20 mb-8">
            <img
                src={user.image}
                alt="Profile"
                className="w-32 h-32 rounded-full border-6 border-white shadow-xl object-cover ring-4 ring-indigo-300 hover:ring-indigo-500 transition-all duration-300"
            />
        </div>


        {/* User Information Grid */}
        <div className="space-y-4">
            
            {/* Full Name */}
            <div className="flex items-center p-4 bg-indigo-50 rounded-xl shadow-inner border-l-4 border-indigo-500">
                <FaIdCard className="text-2xl text-indigo-600 mr-4" />
                <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Full Name</p>
                    <h3 className="text-xl font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                    </h3>
                </div>
            </div>

            {/* Other Details - Two Column Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email */}
                <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase flex items-center">
                        <FaEnvelope className="mr-2 text-green-500" /> Email
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1 truncate">{user.email}</p>
                </div>

                {/* Username */}
                <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase flex items-center">
                        <FaUserTag className="mr-2 text-yellow-500" /> Username
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1">{user.username}</p>
                </div>
                
                {/* ID (Using First Name as proxy for unique ID display) */}
                <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase flex items-center">
                        <FaIdCard className="mr-2 text-blue-500" /> User ID (Local)
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1">{userId}</p>
                </div>
                
                {/* Token Status (To show authenticated state) */}
                <div className="flex flex-col p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <p className="text-xs font-medium text-gray-500 uppercase flex items-center">
                        <FaUserCircle className="mr-2 text-red-500" /> Status
                    </p>
                    <p className="text-sm font-medium text-gray-700 mt-1">Authenticated</p>
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-10 gap-4 pt-6 border-t border-gray-100">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition duration-300 shadow-md font-semibold"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>
          <button
            className="flex items-center justify-center flex-1 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition duration-300 shadow-lg font-semibold transform hover:scale-[1.02]"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
