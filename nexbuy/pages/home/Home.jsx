import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaArrowRight ,FaSignInAlt } from "react-icons/fa"; // Imported icons

function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }
  }, []); 

  const handleClick = () => {
    // Logic remains unchanged, only design is updated
    router.push(isLoggedIn ? "/product" : "/login"); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4 py-20 text-center">
      
      {/* Title */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight drop-shadow-md">
        <FaShoppingCart className="inline text-indigo-600 mr-4 align-top" />
        Welcome to <span className="text-indigo-700">NexBuy</span>
      </h1>

      {/* Tagline */}
      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-12 leading-relaxed font-light">
        Experience the future of online commerce. Manage your shop, track performance, and connect with customers effortlessly.
      </p>

      {/* Action Button */}
      <button
        onClick={handleClick}
        className="mt-6 flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 text-xl font-bold rounded-xl transition-all duration-300 shadow-2xl shadow-indigo-500/50 transform hover:scale-[1.05]"
      >
        {isLoggedIn ? (
          <>
            Browse Products <FaArrowRight className="ml-3" />
          </>
        ) : (
          <>
            Login to Continue <FaSignInAlt className="ml-3" />
          </>
        )}
      </button>
      {!isLoggedIn && (
        <p className="mt-6 text-sm text-gray-500">
          New user? <a onClick={() => router.push('/register')} className="text-indigo-600 font-semibold cursor-pointer hover:underline">Register here.</a>
        </p>
      )}
    </div>
  );
}

export default Home;
