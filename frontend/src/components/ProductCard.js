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
    e.preventDefault(); // Prevents navigation when clicking the heart
    if (isWished) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="product-card">
        <img src={product.image} alt={product.name} />

        <div className="wishlist-icon" onClick={toggleWishlist}>
          {isWished ? <FaHeart color="red" /> : <FaRegHeart />}
        </div>

       <p className="brand-name">{product.brand}</p>
        <h3>{product.name}</h3>


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
