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

        {/* Women Dropdown */}
        <div
          className="nav-item dropdown"
          onMouseEnter={() => setShowWomen(true)}
          onMouseLeave={() => setShowWomen(false)}
        >
          Women
          {showWomen && (
            <div className="dropdown-content">
              <Link to="/category/women/kurti" onClick={handleLinkClick}>Kurti</Link>
              <Link to="/category/women/summer dress" onClick={handleLinkClick}>Summer Dress</Link>
              <Link to="/category/women/tops" onClick={handleLinkClick}>Tops</Link>
              <Link to="/category/women/lehenga" onClick={handleLinkClick}>Lehenga</Link>
              <Link to="/category/women/jeans" onClick={handleLinkClick}>Jeans</Link>
              <Link to="/category/women/palazzo pants" onClick={handleLinkClick}>Palazzo Pants</Link>
              <Link to="/category/women/saree" onClick={handleLinkClick}>Saree</Link>
              <Link to="/category/women/trousers" onClick={handleLinkClick}>Trousers</Link>
              <Link to="/category/women/skirt" onClick={handleLinkClick}>Skirt</Link>
                 
            </div>
          )}
        </div>

        {/* Men Dropdown */}
        <div
          className="nav-item dropdown"
          onMouseEnter={() => setShowMen(true)}
          onMouseLeave={() => setShowMen(false)}
        >
          Men
          {showMen && (
            <div className="dropdown-content">
              <Link to="/category/men/formal shirt" onClick={handleLinkClick}>Formal Shirt</Link>
              <Link to="/category/men/hoodie" onClick={handleLinkClick}>Hoodie</Link>
              <Link to="/category/men/trousers" onClick={handleLinkClick}>Trousers</Link>
              <Link to="/category/men/sweatshirt" onClick={handleLinkClick}>Sweatshirt</Link>
              <Link to="/category/men/track pants" onClick={handleLinkClick}>Track Pants</Link>
              <Link to="/category/men/kurta" onClick={handleLinkClick}>Kurta</Link>
              <Link to="/category/men/blazer" onClick={handleLinkClick}>Blazer</Link>
              <Link to="/category/men/t-shirt" onClick={handleLinkClick}>T-Shirt</Link>
              <Link to="/category/men/denim jacket" onClick={handleLinkClick}>Denim Jacket</Link>
              <Link to="/category/men/jeans" onClick={handleLinkClick}>Jeans</Link>
            </div>
          )}
        </div>

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
