"use client";

import { useRouter, usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, []);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const handleLogout = () => {
    toast.success("User logout successfully", { autoClose: 1000 });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("contactData");
    setIsLoggedIn(false);
    router.push("/");
  };

  const buttonClass = (
    path,
    activeColor = "blue",
    inactiveColor = "gray"
  ) => {
    const isActive = currentPath === path;
    return `px-4 py-2 rounded-full transition-colors duration-200 font-semibold ${
      isActive
        ? `bg-${activeColor}-600 text-white shadow`
        : `text-${inactiveColor}-800 hover:bg-${inactiveColor}-100`
    }`;
  };

  return (
    <header className="backdrop-blur bg-white/120 border-b shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer flex items-center"
        >
          <Image
            src="/assets/images/NexGen.png"
            alt="logo"
            width={64}
            height={40}
            className="rounded-lg shadow-sm"
          />
        </div>

        {/* Hamburger (Mobile) */}
        <div
          className="md:hidden text-3xl text-gray-700 cursor-pointer"
          onClick={toggleMobileMenu}
        >
          <GiHamburgerMenu />
        </div>
        <div
          className={`md:flex md:items-center md:gap-6 transition-all duration-300 ease-in-out overflow-hidden md:overflow-visible ${
            showMobileMenu ? "max-h-[2000px] py-20" : "max-h-0"
          } md:max-h-none w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 px-4 md:px-0 text-sm font-medium text-gray-700">
            {/* Home */}
            <li>
              <Link href="/" className={buttonClass("/", "blue")}>
                Home
              </Link>
            </li>
            {/* About Dropdown */}
            <li className="relative group">
              <button
                onClick={() => setShowAboutDropdown(!showAboutDropdown)}
                className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                About Us {showAboutDropdown ? "▲" : "▼"}
              </button>
              <ul
                className={`absolute bg-white border border-gray-200 text-gray-800 rounded-lg shadow-lg mt-2 w-44 space-y-1 py-2 z-50 transition-all duration-200 ease-in-out transform group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 ${
                  showAboutDropdown
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                }`}
              >
                <li>
                  <Link
                    href="/about"
                    className="w-full block px-4 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowAboutDropdown(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="w-full block px-4 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowAboutDropdown(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    href="/manageshop"
                    className={buttonClass("/manageshop", "blue")}
                  >
                    Manage Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/product"
                    className={buttonClass("/product", "blue")}
                  >
                    Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/performance"
                    className={buttonClass("/performance", "blue")}
                  >
                    Performance
                  </Link>
                </li>

                <li className="relative group">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FaUserCircle className="text-xl" />
                    Profile {showProfileDropdown ? "▲" : "▼"}
                  </button>
                  <ul
                    className={`absolute bg-white border border-gray-200 text-gray-800 rounded-lg shadow-lg mt-2 w-44 space-y-1 py-2 z-50 transition-all duration-200 ease-in-out transform group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 ${
                      showProfileDropdown
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                    }`}
                  >
                    <li>
                      <Link
                        href="/profile"
                        className="w-full block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors"
                        onClick={() => {
                          setShowProfileDropdown(false);
                          handleLogout();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className={buttonClass("/login", "blue")}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className={buttonClass("/register", "green")}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};
