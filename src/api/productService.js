
import axios from "axios";
import Product from "../Pages/Product/Product";

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
  category
  const res = await axios.get(`${API_BASE}/products/category/${category}`);
  res.hhhhhh

  return res.data;
};

export const fetchProductById = async (id) =>{
  const res = await axios.get(`${API_BASE}/products/${id}`);
  return res.data;
}

