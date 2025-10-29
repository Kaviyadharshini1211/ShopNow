import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaHeart} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/slices/productSlice";
import "./Navbar.css";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMen, setShowMen] = useState(false);
  const [showWomen, setShowWomen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate("/search");
    }
  };

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLinkClick = () => {
    dispatch(setSearchQuery(""));
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand-logo" onClick={handleLinkClick}>
          ShopNow 🛍️
        </Link>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products, brands and more"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="navbar-right">
        <Link to="/" className="nav-item" onClick={handleLinkClick}>Home</Link>
        <Link to="/products" className="nav-item" onClick={handleLinkClick}>Products</Link>

        

        <Link to="/cart" className="nav-item cart-icon" onClick={handleLinkClick}>
          <FaShoppingCart />
        </Link>

         <Link to="/wishlist" className="nav-item">
  <FaHeart style={{ marginRight: "5px" }} /> Wishlist
</Link>
    

        {!user ? (
          <>
            <Link to="/login" className="nav-item" onClick={handleLinkClick}>Login</Link>
            <Link to="/register" className="nav-item" onClick={handleLinkClick}>Register</Link>
          </>
        ) : (
          <Link to="/profile" className="nav-item profile-icon" onClick={handleLinkClick}>
            <FaUserCircle style={{ marginRight: "5px" }} />
            {user.name || "Profile"}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
