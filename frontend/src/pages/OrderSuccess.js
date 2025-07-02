// src/pages/OrderSuccess.js
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successTick from "../animations/success-tick.json";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const lastOrder = useSelector((state) => state.orders.list.slice(-1)[0]);
  const navigate = useNavigate();

  if (!lastOrder) return <p>No recent order found.</p>;

  return (
    <div className="order-success-page">
      {/* ✅ Tick animation at the top */}
      <Lottie
        animationData={successTick}
        loop={false}
        className="success-animation"
        style={{ width: 100, height: 100 }}
      />

      <h2>Order Placed Successfully!</h2>
      <p className="thank-you">Thank you for shopping with us.</p>
      <p className="estimate"><strong>Estimated Delivery:</strong> Arriving in 5–7 days</p>

      <div className="summary-box">
        <h3>Order Summary</h3>
        <p><strong>Order ID:</strong> {lastOrder.id}</p>
        <p><strong>Total:</strong> ₹{lastOrder.total}</p>

        <div className="summary-items">
          {lastOrder.items.map((item) => (
            <div className="summary-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="continue-btn" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
