import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.list);

  const [activeTab, setActiveTab] = useState("account");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-tabs">
        <button className={activeTab === "account" ? "active" : ""} onClick={() => setActiveTab("account")}>
          My Account
        </button>
        <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
          My Orders
        </button>
      </div>

      {activeTab === "account" && (
        <div className="profile-info">
          <h2>My Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="orders-section">
          <h2>My Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <h4>Order #{order.id}</h4>
                <p>Date: {order.date}</p>
                <p>Total: ₹{order.total}</p>
                <div className="order-items-list">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.image} alt={item.name} className="order-item-image" />
                      <div className="order-item-info">
                        <p>{item.name}</p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
