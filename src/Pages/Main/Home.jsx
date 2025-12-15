
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const handleClick = () => {
    navigate(isLoggedIn ? "/product" : "/login");
  };

  const handleFeatureClick = (path) => {
    navigate(path);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl animate-bounce"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-40 right-40 w-32 h-32 border border-white/10 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-40 left-40 w-24 h-24 border border-white/10 rotate-12 animate-pulse"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            {/* Enhanced Logo and Brand */}
            <div className="mb-12 animate-slide-up">
              <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl mb-8 shadow-2xl border border-white/20 group hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <span className="relative text-5xl animate-bounce">🛍️</span>
              </div>
              <h1 className="text-7xl lg:text-9xl font-black text-white mb-8 tracking-tight leading-none">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-pulse">
                  NexBuy
                </span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
            </div>

            {/* Enhanced Main Headline */}
            <div className="max-w-5xl mx-auto mb-16 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <h2 className="text-3xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                <span className="block">Revolutionizing</span>
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Digital Commerce
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                Experience the future of online shopping with our AI-powered platform, 
                <span className="text-cyan-300 font-semibold"> seamless user experience</span>, and 
                <span className="text-purple-300 font-semibold"> unmatched product variety</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI-Powered Recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Lightning Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <button
                onClick={handleClick}
                className="group relative btn-primary btn-lg px-10 py-5 text-xl font-bold transform hover:scale-110 transition-all duration-300 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  {isLoggedIn ? (
                    <>
                      <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Browse Products
                    </>
                  ) : (
                    <>
                      <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Get Started
                    </>
                  )}
                </span>
              </button>
              
              {!isLoggedIn && (
                <button
                  onClick={() => handleFeatureClick("/register")}
                  className="group relative btn-secondary btn-lg px-10 py-5 text-xl font-bold bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center">
                    <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create Account
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group card card-hover text-center p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-200 transition-colors">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">
              Experience blazing-fast performance with our optimized platform built for speed and efficiency.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group card card-hover text-center p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6 group-hover:bg-green-200 transition-colors">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Secure & Reliable</h3>
            <p className="text-gray-600 leading-relaxed">
              Your data and transactions are protected with enterprise-grade security and 99.9% uptime guarantee.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group card card-hover text-center p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6 group-hover:bg-purple-200 transition-colors">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Customer First</h3>
            <p className="text-gray-600 leading-relaxed">
              24/7 customer support and personalized shopping experience tailored just for you.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80">Products Available</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-white/80">Uptime</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
