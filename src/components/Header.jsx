import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/images/NexGen.png"
export const Header = () => {
  const [show, setShow] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const handleToggle = () => setShow(!show);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Tailwind class generator with active highlight
  const buttonClass = (path, activeColor = "red", inactiveColor = "blue") => {
    const isActive = currentPath === path;
    return `px-4 py-2 rounded font-medium transition-colors duration-200 ${
      isActive
        ? `bg-${activeColor}-700 text-white`
        : `bg-${inactiveColor}-600 text-white hover:bg-${inactiveColor}-700`
    }`;
  };

  return (
    <header className="bg-gray-800 shadow-md fixed top-0 left-0 w-full z-20">
      <div className="container mx-auto px-3 py-4 flex items-center justify-between">
        {/* Logo */}
        <a className="text-black h-16 justify-items-center text-l font-medium rounded-md transition-colors" onClick={() => navigate("/")}>
          <img src={logo} alt="profile" className="h-16 w-25 rounded-full">
          </img>
        </a>


        {/* Hamburger Icon - Mobile */}
        <div
          className="md:hidden text-2xl text-gray-300 cursor-pointer"
          onClick={handleToggle}
        >
          <GiHamburgerMenu />
        </div>

        {/* Navigation Menu */}
        <nav
          className={`absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ease-in-out z-40 ${
            show ? "block" : "hidden md:block"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0">
            <li>
              <button className={buttonClass("/","blue")} onClick={() => navigate("/")}>
                Home
              </button>
            </li>
          
            <li>
              <button className={buttonClass("/about", "blue")} onClick={() => navigate("/about")}>
                About
              </button>
            </li>
            <li>
              <button className={buttonClass("/contact", "blue")} onClick={() => navigate("/contact")}>
                Contact
              </button>
            </li>

            {/* Conditionally show links if user is logged in */}
            {isLoggedIn ? (
              <>
                 <li>
                  <button className={buttonClass("/manageshop", "blue")} onClick={() => navigate("/manageshop")}>
                    ManageShop
                  </button>
                </li>
                <li>
                  <button className={buttonClass("/product", "blue")} onClick={() => navigate("/product")}>
                    Product
                  </button>
                </li>
                <li>
                  <button className={buttonClass("/performance", "blue")} onClick={() => navigate("/performance")}>
                    Performance
                  </button>
                </li>
                
                <li>
                  <button
                    className={`${buttonClass("/profile","blue")} flex items-center gap-2`}
                    onClick={() => navigate("/profile")}
                  >
                    <FaUserCircle className="text-xl" />
                    
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className={buttonClass("/login", "blue")} onClick={() => navigate("/login")}>
                    Login
                  </button>
                </li>
                <li>
                  <button className={buttonClass("/register", "green")} onClick={() => navigate("/register")}>
                    Register
                  </button>
                </li>
                
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
