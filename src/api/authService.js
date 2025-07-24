
import axios from "axios";

const API_BASE = "https://dummyjson.com";

// LOGIN API
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_BASE}/auth/login`, {
    username,
    password,
  });
  console.log("Login response:", response.data);

  return response.data;
};

  
  

