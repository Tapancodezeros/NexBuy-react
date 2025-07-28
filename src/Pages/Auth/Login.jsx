import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authService";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("michaelw");
  const [password, setPassword] = useState("michaelwpass");
  const [error, setError] = useState("");
  const [storedData, setStoredData] = useState(null);
  useEffect(() => {
    const retrievedData = localStorage.getItem('dummyUser');
    if (retrievedData) {
      setStoredData(JSON.parse(retrievedData));
    }
  }, []); // Empty dependency array ensures effect runs only once on mount


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(username, password);
    
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("userId",res.id);
    
      toast.success(" Login successfully!",{autoClose : 1500});
      setTimeout(() => navigate("/") );
    } catch (err) {
    
      toast.error(" Failed to Login");

    }
  }; 

  return (
    <div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login to NexBuy
        </h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      

        <form onSubmit={handleLogin}>
          <div className="mb-4">
        
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>

 </div>

  );
};

export default Login;
