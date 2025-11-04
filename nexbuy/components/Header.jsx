"use client";
import { useRouter, usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle, FaHome, FaInfoCircle, FaPhone, FaStore, FaChartLine, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaPlusSquare } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, []);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  
  const handleLogout = () => {
    toast.success("User logged out successfully", { autoClose: 1000 });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("contactData");
    setIsLoggedIn(false);
    router.push("/");
  };

  // Centralized function for dynamic button styling
  const getButtonClass = (path, accentColor = "indigo") => {
    const isActive = currentPath === path;
    const baseClass = "px-4 py-2 rounded-full transition-all duration-200 font-semibold text-sm flex items-center justify-center whitespace-nowrap";
    
    if (isActive) {
      return `${baseClass} bg-${accentColor}-600 text-white shadow-md shadow-${accentColor}-500/50`;
    } else {
      return `${baseClass} text-gray-700 hover:bg-gray-100/70 hover:text-${accentColor}-600`;
    }
  };

  return (
    <header className="backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer flex items-center transition-transform hover:scale-105"
        >
          {/* Using a placeholder image since the asset is local */}
          <img
            src="/image/NexGen.png"
            alt="NexBuy Logo"
            width={64}
            height={40}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Hamburger (Mobile) */}
        <div
          className="md:hidden text-3xl text-gray-700 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={toggleMobileMenu}
        >
          <GiHamburgerMenu />
        </div>
        
        {/* Navigation Menu (Desktop & Mobile) */}
        <nav
          className={`md:flex md:items-center md:gap-6 transition-all duration-300 ease-in-out overflow-hidden md:overflow-visible absolute md:static top-full left-0 right-0 bg-white/95 md:bg-transparent shadow-xl md:shadow-none ${
            showMobileMenu ? "max-h-[500px] py-4 border-t border-gray-200" : "max-h-0"
          } md:max-h-none w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-3 lg:gap-5 px-4 md:px-0 text-sm font-medium">
            
            {/* Home */}
            <li>
              <Link href="/" className={getButtonClass("/", "indigo")}>
                <FaHome className="mr-1" /> Home
              </Link>
            </li>
            
            {/* About Dropdown */}
            <li className="relative group/about">
              <button
                onClick={() => setShowAboutDropdown(!showAboutDropdown)}
                className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-md shadow-indigo-500/50"
              >
                Info {showAboutDropdown ? "▲" : "▼"}
              </button>
              <ul
                className={`absolute bg-white border border-gray-200 text-gray-800 rounded-xl shadow-2xl mt-3 w-44 space-y-1 py-2 z-50 transition-all duration-200 ease-in-out transform origin-top ${
                  showAboutDropdown
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                }`}
              >
                <li>
                  <Link
                    href="/about"
                    className="w-full flex items-center px-4 py-2 hover:bg-gray-50/70 hover:text-indigo-600 transition-colors"
                    onClick={() => setShowAboutDropdown(false)}
                  >
                    <FaInfoCircle className="mr-2" /> About NexBuy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="w-full flex items-center px-4 py-2 hover:bg-gray-50/70 hover:text-indigo-600 transition-colors"
                    onClick={() => setShowAboutDropdown(false)}>
                    <FaPhone className="mr-2" /> Contact Us
                  </Link>
                </li>
              </ul>
            </li>

            {isLoggedIn ? (
              <>
                {/* Manage Shop */}
                <li>
                  <Link
                    href="/manageshop"
                    className={getButtonClass("/manageshop", "indigo")}
                  >
                    <FaStore className="mr-1" /> Shop
                  </Link>
                </li>
                {/* Product */}
                <li>
                  <Link
                    href="/product"
                    className={getButtonClass("/product", "indigo")}
                  >
                    <FaPlusSquare className="mr-1" /> Products
                  </Link>
                </li>
                {/* Performance */}
                <li>
                  <Link
                    href="/performance"
                    className={getButtonClass("/performance", "indigo")}
                  >
                    <FaChartLine className="mr-1" /> Performance
                  </Link>
                </li>

                {/* Profile Dropdown */}
                <li className="relative group/profile">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md shadow-green-500/50"
                  >
                    <FaUserCircle className="text-xl" />
                    Profile {showProfileDropdown ? "▲" : "▼"}
                  </button>
                  <ul
                    className={`absolute right-0 bg-white border border-gray-200 text-gray-800 rounded-xl shadow-2xl mt-3 w-44 space-y-1 py-2 z-50 transition-all duration-200 ease-in-out transform origin-top-right ${
                      showProfileDropdown
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                    }`}
                  >
                    <li>
                      <Link
                        href="/profile"
                        className="w-full flex items-center px-4 py-2 hover:bg-gray-50/70 hover:text-indigo-600 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <FaUserCircle className="mr-2" /> View Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors"
                        onClick={() => {
                          setShowProfileDropdown(false);
                          handleLogout();
                        }}
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              // Login / Register Buttons
              <li className="flex flex-col md:flex-row gap-3">
                <Link
                  href="/login"
                  className={getButtonClass("/login", "indigo")}
                >
                  <FaSignInAlt className="mr-1" /> Login
                </Link>
                <Link
                  href="/register"
                  className={getButtonClass("/register", "green")}
                >
                  <FaUserPlus className="mr-1" /> Register
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
