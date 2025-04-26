import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  const handleIncrease = (id, size) => {
    dispatch(increaseQuantity({ id, size }));
  };

  const handleDecrease = (id, size) => {
    dispatch(decreaseQuantity({ id, size }));
  };

  const handleCheckout = () => {
    navigate("/address"); // Redirect to Address Page first
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Shopping Bag</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size || "no-size"}`}
                className="cart-item"
              >
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  {item.size && <p>Size: {item.size}</p>}
                  <p>Price: ₹{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrease(item.id, item.size)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id, item.size)}>+</button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Price Summary</h3>
            <p>Total Items: {cartItems.length}</p>
            <p>Subtotal: ₹{subtotal}</p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Place Order
            </button>
            <button className="clear-btn" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
