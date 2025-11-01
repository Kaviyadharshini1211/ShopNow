import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../redux/slices/authSlice"; // ✅ FIXED: added login
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import "./Profile.css";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
  });

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await API.put(
        `/users/profile/${user._id}`,
        formData
      );
      alert("Profile updated successfully");
      dispatch(login(res.data)); // ✅ This will now work
      setIsEditing(false);
    } catch (err) {
      console.error("Update error", err);
      alert("Failed to update profile");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="profile-section">
            <h2>Profile Info</h2>
            {!isEditing ? (
              <>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Mobile:</strong> {formData.mobile}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
              </>
            ) : (
              <>
                <label>Name</label>
                <input name="name" value={formData.name} onChange={handleChange} />
                <label>Email</label>
                <input name="email" value={formData.email} onChange={handleChange} />
                <label>Mobile</label>
                <input name="mobile" value={formData.mobile} onChange={handleChange} />
                <label>Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} />
                <button className="save-btn" onClick={handleSave}>Save</button>
              </>
            )}
          </div>
        );

      case "orders":
        return (
          <div className="orders-section">
            <h2>My Orders</h2>
            {orders.length === 0 ? (
              <p>No orders placed yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="order-card">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <img src={item.image} alt={item.name} />
                        <div>
                          <p>{item.name}</p>
                          <p>Qty: {item.quantity}</p>
                          <p>₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case "coupons":
        return <h2>No coupons available</h2>;

      case "addresses":
        return <h2>Your saved addresses</h2>;

      default:
        return null;
    }
  };

  return (
    <div className="myntra-profile-layout">
      <div className="sidebar">
        <h3>Account</h3>
        <ul>
          <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
            Profile Info
          </li>
          <li className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
            My Orders
          </li>
          <li className={activeTab === "coupons" ? "active" : ""} onClick={() => setActiveTab("coupons")}>
            My Coupons
          </li>
          <li className={activeTab === "addresses" ? "active" : ""} onClick={() => setActiveTab("addresses")}>
            My Addresses
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="main-content">{renderContent()}</div>
    </div>
  );
};

export default Profile;
