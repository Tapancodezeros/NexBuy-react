"use client";
import axios from "axios";

// ✅ Base API URL
const API_URL = "http://localhost:3006/api";
const api = axios.create({
  baseURL: API_URL,
});

// ✅ Fetch all products
export const fetchAllProducts = async () => {
  try {
    const response = await api.get("/products");
    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    console.error("❌ Error fetching all products:", error);
    return [];
  }
};

// ✅ Fetch all product categories
export const fetchCategories = async () => {
  try {
    const response = await api.get("/products/categories");
    const data = response.data?.data;
    return Array.isArray(data) ? data : data?.categories || [];
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [];
  }
};

// ✅ Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    const data = response.data?.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`❌ Error fetching products for category "${category}":`, error);
    return [];
  }
};
// ✅ Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating product:", error);
    throw error;
  }
};

// ✅ Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data?.data;
  } catch (error) {
    console.error(`❌ Error fetching product with ID "${id}":`, error);
    throw error; 
  }
};

// ✅ Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.patch(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`❌ Error updating product with ID "${id}":`, error);
    throw error;
  }
};

// ✅ Delete a product
export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error(`❌ Error deleting product with ID "${id}":`, error);
    throw error;
  }
};

// ✅ List all shops
export const listshop = async () => {
  try {
    const response = await api.get("/manage-shop");
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error("❌ Error fetching all shops:", error);
    return [];
  }
};

// ✅ Create a new shop
export const createShop = async (userId, shopData) => {
  try {
    const response = await api.post(`/manage-shop/user/${userId}`, shopData);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creating shop for user "${userId}":`, error);
    throw error;
  }
};
//shop by user
export const listShopsByUser = async (userId) => {
  try {
    const response = await api.get(`/manage-shop/user/${userId}`);
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error(`❌ Error fetching shops for user with ID "${userId}":`, error);
    return [];
  }
};

// ✅ Update an existing shop
export const updateShop = async (id, shopData) => {
  try {
    const response = await api.patch(`/manage-shop/${id}`, shopData);
    return response.data;
  } catch (error) {
    console.error(`❌ Error updating shop with ID "${id}":`, error);
    throw error;
  }
};

// ✅ Delete a shop
export const deleteShop = async (id) => {
  try {
    await api.delete(`/manage-shop/${id}`);
  } catch (error) {
    console.error(`❌ Error deleting shop with ID "${id}":`, error);
    throw error;
  }
};

// ✅ Login user
export const login = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    console.log("🚀 ~ login ~ response:", response)
    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
};

// ✅ List all users
export const listUsers = async () => {
  try {
    const response = await api.get("/users");
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error("❌ Error fetching all users:", error);
    return [];
  }
};

// ✅ Create a new user
export const createNewUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    throw error;
  }
};

// ✅ Get one user by ID
export const getOneUser = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data?.data;
  } catch (error) {
    console.error(`❌ Error fetching user with ID "${id}":`, error);
    throw error;
  }
};

// ✅ Delete a user
export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error(`❌ Error deleting user with ID "${id}":`, error);
    throw error;
  }
};
