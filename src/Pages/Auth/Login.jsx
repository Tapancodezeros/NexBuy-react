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
      toast.error("User already logged in" , { autoClose: 1000 });
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    
    const dummyUser = JSON.parse(localStorage.getItem("dummyUsers"),[]);

    if (
      dummyUser &&
      dummyUser.username === username &&
      dummyUser.password === password
    ) {
      localStorage.setItem("token", "local"); 
      localStorage.setItem("userId", dummyUser.email);
      toast.success("Logged in with local account!", { autoClose: 1000 });
      setTimeout(() => navigate("/"), 1000);
      return;
    }
    
    try {
      const res = await loginUser(username, password);
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("userId", res.id);
      toast.success("Login via API successful!", { autoClose: 1000 });
      setTimeout(() => navigate("/"), 800);
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
         <button type="submit" className=" flex items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 
            hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg 
            shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm p-44 py-2.5 text-center me-2 mb-2">
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
