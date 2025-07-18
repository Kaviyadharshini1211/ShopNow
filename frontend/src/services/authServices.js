import axios from "axios";

const API_URL = "https://shoppica.onrender.com/api/auth";

// User Login
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// User Registration
export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data;
};

// User Logout
export const logoutUser = () => {
  localStorage.removeItem("user");
};
