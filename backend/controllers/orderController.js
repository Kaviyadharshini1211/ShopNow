import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
};

export const getOrders = (req, res) => {
  res.status(200).json({ message: "Orders fetched successfully" });
};

export const createOrder = (req, res) => {
  res.status(201).json({ message: "Order created successfully" });
};

