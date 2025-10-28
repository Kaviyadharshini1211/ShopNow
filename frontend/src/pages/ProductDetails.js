import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const isWished = wishlist.some((item) => item.id === parseInt(id));

  useEffect(() => {
    const found = allProducts?.find((p) => p.id?.toString() === id);
    if (found) setProduct(found);
  }, [allProducts, id]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`/api/recommend/${product.id}`);
        const data = await res.json();
        setRecommendations(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      }
    };

    if (product) fetchRecommendations();
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg("Please select a size.");
      return;
    }

    const itemToAdd = {
      id: product.id,
      name: product.title || product.name,
      price: product.price,
      image: product.thumbnail || (product.images && product.images[0]) || product.image,
      size: selectedSize,
      quantity: 1,
    };

    dispatch(addToCart(itemToAdd));
    alert(`Added "${product.title || product.name}" to cart - Size: ${selectedSize}`);
    setErrorMsg("");
  };

  const toggleWishlist = () => {
    if (!product) return;
    if (isWished) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  if (!product)
    return <p className="loading">Loading or product not found...</p>;

  const discount =
    product.originalPrice && product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : product.discountPercentage || 0;

  // 🔹 Image fix — supports new + old keys
  const mainImage =
    product.thumbnail || (product.images && product.images[0]) || product.image || "/placeholder.jpg";

  const productName = product.title || product.name || "Unnamed Product";

  return (
    <div className="product-detail-container">
      <img
        src={mainImage}
        alt={productName}
        className="product-detail-image"
      />

      <div className="product-detail-info">
        <p className="brand-name">{product.brand}</p>
        <h2>{productName}</h2>

        {/* 🏷️ Discount Section */}
        <div className="product-price-row">
          <span className="discounted-price">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">₹{product.originalPrice}</span>
              <span className="discount-label">{discount}% OFF</span>
            </>
          )}
        </div>

        <p>{product.description}</p>

        {/* 👕 Size Selection */}
        <div className="size-options-box">
          <p>Select Size:</p>
          <div className="size-button-group">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                onClick={() => {
                  setSelectedSize(size);
                  setErrorMsg("");
                }}
              >
                {size}
              </button>
            ))}
          </div>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </div>

        {/* ❤️ + 🛒 Buttons */}
        <div className="product-detail-actions">
          <button className="wishlist-btn" onClick={toggleWishlist}>
            {isWished ? <FaHeart color="red" /> : <FaRegHeart />} Wishlist
          </button>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* 🔁 Recommendations */}
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h3>Recommended for You</h3>
          <div className="recommendation-list">
            {recommendations.map((item) => (
              <div key={item._id || item.id} className="recommended-product-card">
                <img
                  src={
                    item.thumbnail ||
                    (item.images && item.images[0]) ||
                    item.image ||
                    "/placeholder.jpg"
                  }
                  alt={item.title || item.name}
                />
                <p>{item.title || item.name}</p>
                <p>₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
