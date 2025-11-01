import API from "./api"; // ✅ import your axios instance from src/api.js

// 🟢 User Login
export const loginUser = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

// 🟣 User Registration
export const registerUser = async (name, email, password) => {
  const response = await API.post("/auth/register", { name, email, password });
  return response.data;
};

// 🔴 User Logout
export const logoutUser = () => {
  localStorage.removeItem("user");
};
