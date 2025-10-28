import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const isWished = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    if (isWished) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // 🔹 Fix: Handle both old and new formats
  const imageSrc =
    product.thumbnail || (product.images && product.images[0]) || product.image || "/placeholder.jpg";

  const productName = product.title || product.name || "Unnamed Product";

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discountPercentage || 0;

  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="product-card">
        <img src={imageSrc} alt={productName} className="product-image" />

        <div className="wishlist-icon" onClick={toggleWishlist}>
          {isWished ? <FaHeart color="red" /> : <FaRegHeart />}
        </div>

        <p className="brand-name">{product.brand}</p>
        <h3>{productName}</h3>

        <div className="price-row">
          <span className="discounted-price">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">₹{product.originalPrice}</span>
              <span className="discount-label">{discount}% OFF</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
