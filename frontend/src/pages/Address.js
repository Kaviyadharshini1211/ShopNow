// src/pages/Address.js

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import "./Address.css";
import API from "../services/api";
const Address = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [savedAddress, setSavedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (!user) return navigate("/login");

    // fetch saved address
    const fetchAddress = async () => {
      try {
        const res = await API.get(`/users/profile/${user._id}`);
        if (res.data?.address) {
          setSavedAddress(res.data);
        } else {
          setShowForm(true); // no saved address
        }
      } catch (err) {
        console.error("Failed to fetch user address", err);
      }
    };

    fetchAddress();
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = async () => {
    try {
      await API.put(`/users/profile/${user._id}`, {
        ...user,
        ...formData,
      });
      alert("Address saved successfully");
      navigate("/checkout");
    } catch (err) {
      console.error("Failed to save address", err);
      alert("Could not save address");
    }
  };

  const handleDeliverHere = () => {
    navigate("/checkout");
  };

  return (
    <div className="address-page">
      <div className="header-row">
        <h3>Saved Address</h3>
        {savedAddress && (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Add New Address
          </button>
        )}
      </div>

      {savedAddress && !showForm ? (
        <div className="address-card">
          <div className="radio-name-row">
            <input type="radio" checked readOnly />
            <strong>{savedAddress.name}</strong>
            <span className="default">(Default)</span>
            <span className="tag">HOME</span>
          </div>
          <p>{savedAddress.address}, {savedAddress.city} - {savedAddress.pincode}</p>
          <p>Mobile: <strong>{savedAddress.mobile}</strong></p>

          <div className="address-actions">
            <button className="deliver-btn" onClick={handleDeliverHere}>DELIVERING HERE</button>
            <button className="edit-btn" onClick={() => setShowForm(true)}>EDIT</button>
          </div>
        </div>
      ) : (
        <div className="address-form">
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} />
          <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
          <button onClick={handleSaveAddress}>Deliver to this Address</button>
        </div>
      )}
    </div>
  );
};

export default Address;
