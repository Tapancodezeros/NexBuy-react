
import axios from "axios";


export const fetchProducts = async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchCategories = async () => {
  const res = await axios.get("https://fakestoreapi.com/products/categories");
  return res.data;
};

export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  return res.data;
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`https://dummyjson.com/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error; 
  }
};
