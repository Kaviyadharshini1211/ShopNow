import API from "./api"; // ✅ same folder, so use './api'

// 🟢 Fetch All Products
export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// 🟣 Fetch Single Product by ID
export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};
