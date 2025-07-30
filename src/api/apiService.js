// src/api/apiService.js
import axios from "axios";

const FAKESTORE_API = "https://fakestoreapi.com";
const DUMMYJSON_API = "https://dummyjson.com";

// --- Product APIs (from fakestoreapi.com) ---

export const fetchProducts = async () => {
  const res = await axios.get(`${FAKESTORE_API}/products`);
  return res.data;
};

export const fetchCategories = async () => {
  const res = await axios.get(`${FAKESTORE_API}/products/categories`);
  return res.data;
};

export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`${FAKESTORE_API}/products/category/${category}`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${FAKESTORE_API}/products/${id}`);
  return res.data;
};

// --- Auth APIs (from dummyjson.com) ---

export const loginUser = async (username, password) => {
  const res = await axios.post(`${DUMMYJSON_API}/auth/login`, {
    username,
    password,
  });
  console.log("Login response:", res.data);
  return res.data;
};
