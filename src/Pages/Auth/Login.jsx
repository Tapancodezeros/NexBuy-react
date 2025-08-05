import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/apiService"; // API login function
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("michaelw");
  const [password, setPassword] = useState("michaelwpass");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.error("User already logged in");
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    
    const dummyUser = JSON.parse(localStorage.getItem("dummyUser"));

    if (
      dummyUser &&
      dummyUser.email === username &&
      dummyUser.password === password
    ) {
      localStorage.setItem("token", "local"); 
      localStorage.setItem("userId", dummyUser.email);
      toast.success("Logged in with local account!", { autoClose: 1500 });
      setTimeout(() => navigate("/"), 1000);
      return;
    }
    
    try {
      const res = await loginUser(username, password);
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("userId", res.id);
      toast.success("Login via API successful!", { autoClose: 1500 });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error("Login failed. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl transition hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login to <span className="text-gray-800">NexBuy</span>
        </h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username or Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username or email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition transform hover:scale-[1.02] duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
