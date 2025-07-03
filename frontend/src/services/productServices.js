import axios from "axios";

const API_URL = "https://shoppica.onrender.com/api/products";

// Fetch All Products
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch Single Product by ID
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
