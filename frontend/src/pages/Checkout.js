// src/pages/Checkout.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../redux/slices/ordersSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [method, setMethod] = useState(""); // upi | card | cod
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({ number: "", name: "", exp: "", cvv: "" });

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = () => setShowPaymentOptions(true);

  const handlePay = () => {
    if (!user) {
      alert("Please log in to place an order.");
      return navigate("/login");
    }

    const order = {
      id: Date.now().toString(),
      userId: user.id,
      date: new Date().toISOString().split("T")[0],
      total: subtotal,
      
      items: cartItems.map(({ id, name, quantity, image }) => ({ id, name, quantity, image })),

      paymentMethod: method
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    alert("Order placed successfully!");
    navigate("/profile?tab=orders");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="checkout-details">
                <h4>{item.name}</h4>
                <p>Qty: {item.quantity}</p>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="checkout-right">
        <h3>Subtotal: ₹{subtotal}</h3>

        {!showPaymentOptions ? (
          <button className="pay-button" onClick={handleCheckout}>
            Proceed to Pay
          </button>
        ) : (
          <div className="payment-section">
            <h3>Choose Payment Mode</h3>
            <div className="payment-options">
              <button onClick={() => setMethod("upi")} className={method === "upi" ? "active" : ""}>💳 UPI</button>
              <button onClick={() => setMethod("card")} className={method === "card" ? "active" : ""}>💳 Card</button>
              <button onClick={() => setMethod("cod")} className={method === "cod" ? "active" : ""}>💵 COD</button>
            </div>

            {method === "upi" && (
              <div className="payment-form">
                <label>Enter UPI ID:</label>
                <input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="xyz@bank" />
                <button disabled={!upiId} onClick={handlePay}>Pay ₹{subtotal}</button>
              </div>
            )}

            {method === "card" && (
              <div className="payment-form">
                <label>Card Number:</label>
                <input value={cardData.number} onChange={(e) => setCardData({ ...cardData, number: e.target.value })} />
                <label>Name on Card:</label>
                <input value={cardData.name} onChange={(e) => setCardData({ ...cardData, name: e.target.value })} />
                <label>Expiry / CVV:</label>
                <div className="card-row">
                  <input placeholder="MM/YY" value={cardData.exp} onChange={(e) => setCardData({ ...cardData, exp: e.target.value })} />
                  <input placeholder="CVV" value={cardData.cvv} onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })} />
                </div>
                <button disabled={!(cardData.number && cardData.name && cardData.exp && cardData.cvv)} onClick={handlePay}>
                  Pay ₹{subtotal}
                </button>
              </div>
            )}

            {method === "cod" && (
              <div className="payment-form">
                <p>Cash on Delivery selected.</p>
                <button onClick={handlePay}>Place Order</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
