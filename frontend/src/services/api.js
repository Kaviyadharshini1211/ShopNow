import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 👈 load from .env
});

export const fetchSimilarProducts = async (productId) => {
  const response = await API.get(`/products/${productId}/similar`);
  return response.data;
};

export default API;
