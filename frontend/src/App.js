import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/slices/productSlice";
import Address from "./pages/Address";
import SearchResults from "./pages/SearchResults";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from './pages/Wishlist';
import Orders from "./pages/Orders";
// Components
import Navbar from "./components/Navbar";
import OrderSuccess from "./pages/OrderSuccess";
// Global Styles
import "./styles.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<SearchResults />} />
           <Route path="/orders" element={<Orders />} />
           <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
           
          <Route path="/category/:gender/:subcategory" element={<CategoryPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
