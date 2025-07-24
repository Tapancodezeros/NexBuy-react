// src/services/productService.js
import axios from "axios";
import Product from "../Pages/Product";

const API_BASE = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
};

export const fetchCategories = async () => {
  const res = await axios.get(`${API_BASE}/products/categories`);
  return res.data;
};

export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`${API_BASE}/products/category/${category}`);
  return res.data;
};

