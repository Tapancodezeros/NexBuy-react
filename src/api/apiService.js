
import axios from "axios";


export const fetchProducts = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    return response.data;
 
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
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
};

export const loginUser = async (username, password) => {
    const response = await axios.post(`https://dummyjson.com/auth/login`, {
      username,
      password,
    });
    return response.data;
};
