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

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [method, setMethod] = useState(""); // upi | card | cod
  const [upiId, setUpiId] = useState("");
  const [cardData, setCardData] = useState({ number: "", name: "", exp: "", cvv: "" });

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal - discount;

  const applyCoupon = () => {
    const trimmed = coupon.trim().toLowerCase();
    if (trimmed === "save10") {
      setDiscount(100);
    } else if (trimmed === "save50") {
      setDiscount(500);
    } else {
      alert("Invalid coupon");
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setShowPaymentOptions(true);
  };

  const handlePay = () => {
    if (!user) {
      alert("Please log in to place an order.");
      return navigate("/login");
    }

    const order = {
      id: Date.now().toString(),
      userId: user._id || user.id,
      date: new Date().toISOString().split("T")[0],
      total,
      items: cartItems.map(({ id, name, title, quantity, image, thumbnail, images }) => ({
        id,
        name: title || name,
        quantity,
        image: thumbnail || (images && images[0]) || image || "/placeholder.jpg",
      })),
      paymentMethod: method,
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    navigate("/order-success");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Order Summary</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => {
              const imageSrc =
                item.thumbnail || (item.images && item.images[0]) || item.image || "/placeholder.jpg";
              const name = item.title || item.name || "Unnamed Product";

              return (
                <div className="checkout-item" key={item.id}>
                  <img src={imageSrc} alt={name} />
                  <div className="checkout-details">
                    <h4>{name}</h4>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              );
            })}

            <div className="coupon-box">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>
          </>
        )}
      </div>

      <div className="checkout-right">
        <div className="summary-box">
          <h3>Price Details</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span className="green">− ₹{discount}</span>
          </div>
          <div className="summary-row total">
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>

          {!showPaymentOptions ? (
            <button className="pay-button" onClick={handleCheckout}>
              Proceed to Pay
            </button>
          ) : (
            <div className="payment-section">
              <h3>Select Payment Method</h3>
              <div className="payment-options">
                <button
                  onClick={() => setMethod("upi")}
                  className={method === "upi" ? "active" : ""}
                >
                  UPI
                </button>
                <button
                  onClick={() => setMethod("card")}
                  className={method === "card" ? "active" : ""}
                >
                  Card
                </button>
                <button
                  onClick={() => setMethod("cod")}
                  className={method === "cod" ? "active" : ""}
                >
                  Cash on Delivery
                </button>
              </div>

              {/* UPI Payment */}
              {method === "upi" && (
                <div className="payment-form">
                  <input
                    type="text"
                    placeholder="Enter UPI ID"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <button disabled={!upiId.trim()} onClick={handlePay}>
                    Pay ₹{total}
                  </button>
                </div>
              )}

              {/* Card Payment */}
              {method === "card" && (
                <div className="payment-form">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  />
                  <div className="card-row">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardData.exp}
                      onChange={(e) => setCardData({ ...cardData, exp: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                    />
                  </div>
                  <button
                    onClick={handlePay}
                    disabled={
                      !(cardData.number && cardData.name && cardData.exp && cardData.cvv)
                    }
                  >
                    Pay ₹{total}
                  </button>
                </div>
              )}

              {/* COD Payment */}
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
    </div>
  );
};

export default Checkout;
