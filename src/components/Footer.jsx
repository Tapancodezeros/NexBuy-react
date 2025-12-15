
import footerContact from "../api/footerApi.json";
import { IoCallSharp } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { TbMailPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const footerIcon = {
    MdPlace: <MdPlace className="text-5xl text-blue-600 drop-shadow-sm" />,
    IoCallSharp: <IoCallSharp className="text-5xl text-green-600 drop-shadow-sm" />,
    TbMailPlus: <TbMailPlus className="text-5xl text-red-600 drop-shadow-sm" />,
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/product" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Brand and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div 
              onClick={() => navigate("/")} 
              className="cursor-pointer group mb-6"
            >
              <h3 className="text-3xl font-bold text-gradient group-hover:scale-105 transition-transform duration-200">
                NexBuy
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your next-generation e-commerce destination. Experience the future of online shopping with our cutting-edge platform.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                <span className="text-white font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                <span className="text-white font-bold">@</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform block text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-semibold mb-6 text-white">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {footerContact.map((curData, index) => {
            const { icon, title, details } = curData;
            return (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/70 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 transform group-hover:scale-110 transition-transform duration-200">
                    {footerIcon[icon]}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-lg text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {title}
                    </h5>
                    <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {details}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {new Date().getFullYear()} <span className="text-white font-semibold">NexBuy</span>. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl"></div>
    </footer>
  );
};
