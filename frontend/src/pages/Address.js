// src/pages/Address.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Address.css";

const Address = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    // You can store this in Redux or context if needed later
    localStorage.setItem("deliveryAddress", JSON.stringify(address));
    navigate("/checkout");
  };

  return (
    <div className="address-container">
      <h2>Enter Delivery Address</h2>
      <div className="address-form">
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
        <input name="addressLine" placeholder="Address Line" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        <button onClick={handleContinue}>Deliver to this Address</button>
      </div>
    </div>
  );
};

export default Address;
