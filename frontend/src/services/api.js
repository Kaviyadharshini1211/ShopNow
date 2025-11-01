// src/api.js
import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 change if backend runs elsewhere
});

// Fetch similar products (uses axios)
export const fetchSimilarProducts = async (productId) => {
  const response = await API.get(`/products/${productId}/similar`);
  return response.data;
};

export default API;
