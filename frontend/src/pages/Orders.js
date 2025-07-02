import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import successTick from "../animations/success-tick.json";
const Orders = () => {
  const orders = useSelector((state) => state.orders.list);
  const navigate = useNavigate();

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="order-product"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p><strong>{item.name}</strong></p>
                    <p>Size: {item.size}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
