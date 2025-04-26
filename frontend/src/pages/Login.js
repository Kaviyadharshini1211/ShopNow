import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Navbar from "../components/Navbar"; 
import "./Login.css"; // ✅ Keeps your existing CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Sending Login Request...");
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      console.log("Response from Server:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(login(response.data.user)); // Save user in Redux
        alert("Logged in successfully!");
        navigate("/"); // ✅ Redirect to Home Page
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Keeps navbar without affecting layout */}
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome to <span>ShopNow</span></h2>
          
          {/* ✅ Social Login Buttons (No changes) */}
          <button className="social-btn google"><FaGoogle /> Login with Google</button>
          <button className="social-btn facebook"><FaFacebook /> Login with Facebook</button>
          <div className="divider">OR</div>

          {/* ✅ Login Form */}
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            {/* ✅ Remember Me & Forgot Password (Kept same) */}
            <div className="options">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          {/* ✅ Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* ✅ Register Link (Kept same) */}
          <p className="register-text">Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </>
  );
};

export default Login;
