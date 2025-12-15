
import { useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/images/NexGen.png";

export const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const profileDropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setShowAboutDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("contactData");
    setShowProfileDropdown(false);
    navigate("/");
  };

  const navButtonClass = (path) => {
    const isActive = currentPath === path;
    return `nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`;
  };

  return (
    <header className="backdrop-blur-custom bg-white/95 border-b border-gray-200 shadow-lg fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div onClick={() => navigate("/")} className="cursor-pointer group">
            <img 
              src={logo} 
              alt="NexBuy Logo" 
              className="h-10 w-auto lg:h-12 lg:w-28 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-200 transform group-hover:scale-105" 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <button 
              className={navButtonClass("/")} 
              onClick={() => navigate("/")}
            >
              Home
            </button>

            {/* About Dropdown */}
            <div className="relative" ref={aboutDropdownRef}>
              <button
                onClick={() => setShowAboutDropdown(!showAboutDropdown)}
                className="nav-link nav-link-inactive flex items-center gap-2 group"
              >
                <span>About Us</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showAboutDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`dropdown-menu ${showAboutDropdown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setShowAboutDropdown(false);
                    navigate("/about");
                  }}
                >
                  About Us
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setShowAboutDropdown(false);
                    navigate("/contact");
                  }}
                >
                  Contact
                </button>
              </div>
            </div>
          
            {isLoggedIn ? (
              <>
                <button 
                  className={navButtonClass("/manageshop")} 
                  onClick={() => navigate("/manageshop")}
                >
                  Manage Shop
                </button>
                <button 
                  className={navButtonClass("/product")} 
                  onClick={() => navigate("/product")}
                >
                  Products
                </button>
                <button 
                  className={navButtonClass("/performance")} 
                  onClick={() => navigate("/performance")}
                >
                  Performance
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <FaUserCircle className="text-lg" />
                    <span>Profile</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`dropdown-menu ${showProfileDropdown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        navigate("/profile");
                      }}
                    >
                      View Profile
                    </button>
                    <button
                      className="dropdown-item text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button 
                  className="btn-primary" 
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button 
                  className="btn-success" 
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            <GiHamburgerMenu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          showMobileMenu ? 'max-h-96 pb-6' : 'max-h-0'
        }`}>
          <nav className="pt-4 pb-2 space-y-2">
            <button 
              className={`w-full text-left ${navButtonClass("/")} block`} 
              onClick={() => {
                navigate("/");
                setShowMobileMenu(false);
              }}
            >
              Home
            </button>

            {/* Mobile About Dropdown */}
            <div className="space-y-1">
              <button
                className="w-full text-left nav-link nav-link-inactive flex items-center justify-between"
                onClick={() => setShowAboutDropdown(!showAboutDropdown)}
              >
                <span>About Us</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showAboutDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showAboutDropdown && (
                <div className="ml-4 space-y-1">
                  <button
                    className="w-full text-left dropdown-item"
                    onClick={() => {
                      navigate("/about");
                      setShowMobileMenu(false);
                      setShowAboutDropdown(false);
                    }}
                  >
                    About Us
                  </button>
                  <button
                    className="w-full text-left dropdown-item"
                    onClick={() => {
                      navigate("/contact");
                      setShowMobileMenu(false);
                      setShowAboutDropdown(false);
                    }}
                  >
                    Contact
                  </button>
                </div>
              )}
            </div>
          
            {isLoggedIn ? (
              <>
                <button 
                  className={`w-full text-left ${navButtonClass("/manageshop")} block`} 
                  onClick={() => {
                    navigate("/manageshop");
                    setShowMobileMenu(false);
                  }}
                >
                  Manage Shop
                </button>
                <button 
                  className={`w-full text-left ${navButtonClass("/product")} block`} 
                  onClick={() => {
                    navigate("/product");
                    setShowMobileMenu(false);
                  }}
                >
                  Products
                </button>
                <button 
                  className={`w-full text-left ${navButtonClass("/performance")} block`} 
                  onClick={() => {
                    navigate("/performance");
                    setShowMobileMenu(false);
                  }}
                >
                  Performance
                </button>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <button
                    className="w-full text-left dropdown-item"
                    onClick={() => {
                      navigate("/profile");
                      setShowMobileMenu(false);
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    className="w-full text-left dropdown-item text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-3">
                <button 
                  className="w-full btn-primary" 
                  onClick={() => {
                    navigate("/login");
                    setShowMobileMenu(false);
                  }}
                >
                  Login
                </button>
                <button 
                  className="w-full btn-success" 
                  onClick={() => {
                    navigate("/register");
                    setShowMobileMenu(false);
                  }}
                >
                  Register
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
