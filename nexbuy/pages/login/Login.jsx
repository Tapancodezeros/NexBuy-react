import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/api/apiService";
import { toast } from "react-toastify";
import { FaSignInAlt, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Changed from username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        toast.warn("You are already logged in.", { autoClose: 1000 });
        router.push("/");
      }
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (typeof window === "undefined") return;

    try {
      // The backend login likely expects an object with username/email and password
      const credentials = { email, password };
      const res = await login(credentials);
      
      // Store the JWT token from the response
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.id);
      
      setEmail("");
      setPassword("");
      
      toast.success("Login successful! Welcome back.", { autoClose: 1000 });
      setTimeout(() => router.push("/"), 800);
    } catch (err) {
      toast.error("Login failed. Check your credentials.");
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-3xl border border-gray-100 transition-all duration-300 transform hover:shadow-indigo-300/50">
        
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900 tracking-tight mb-8 flex items-center justify-center">
          <FaSignInAlt className="mr-3 text-indigo-600" />
          Sign In
        </h2>
        
        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl text-sm mb-6 text-center font-medium shadow-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-indigo-500" /> Email Address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition duration-200"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaLock className="mr-2 text-indigo-500" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition duration-200"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-lg transition duration-300 shadow-lg transform hover:scale-[1.01] mt-8"
          >
            <FaSignInAlt className="mr-2" /> Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-8 text-sm text-center text-gray-600 pt-4 border-t border-gray-100">
          New to NexBuy?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline cursor-pointer flex items-center justify-center mt-2"
          >
            <FaUserPlus className="mr-1" /> Create an Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
