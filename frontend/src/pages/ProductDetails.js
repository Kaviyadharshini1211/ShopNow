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
    return <p className="pd-loading">Loading or product not found...</p>;

  const discount =
    product.originalPrice && product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : product.discountPercentage || 0;

  const mainImage =
    product.thumbnail || (product.images && product.images[0]) || product.image || "/placeholder.jpg";

  const productName = product.title || product.name || "Unnamed Product";

  return (
    <div className="pd-container">
      <img
        src={mainImage}
        alt={productName}
        className="pd-image"
      />

      <div className="pd-info">
        <p className="pd-brand-name">{product.brand}</p>
        <h2 className="pd-title">{productName}</h2>

        <div className="pd-price-row">
          <span className="pd-discounted-price">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="pd-original-price">₹{product.originalPrice}</span>
              <span className="pd-discount-label">{discount}% OFF</span>
            </>
          )}
        </div>

        <p className="pd-description">{product.description}</p>

        <div className="pd-size-options-box">
          <p className="pd-size-label">Select Size:</p>
          <div className="pd-size-button-group">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`pd-size-btn ${selectedSize === size ? "pd-size-selected" : ""}`}
                onClick={() => {
                  setSelectedSize(size);
                  setErrorMsg("");
                }}
              >
                {size}
              </button>
            ))}
          </div>
          {errorMsg && <p className="pd-error-msg">{errorMsg}</p>}
        </div>

        <div className="pd-actions">
          <button className="pd-wishlist-btn" onClick={toggleWishlist}>
            {isWished ? <FaHeart color="red" /> : <FaRegHeart />} Wishlist
          </button>

          <button className="pd-add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="pd-recommendations-section">
          <h3 className="pd-recommendations-title">Recommended for You</h3>
          <div className="pd-recommendation-list">
            {recommendations.map((item) => (
              <div key={item._id || item.id} className="pd-recommended-card">
                <img
                  src={
                    item.thumbnail ||
                    (item.images && item.images[0]) ||
                    item.image ||
                    "/placeholder.jpg"
                  }
                  alt={item.title || item.name}
                  className="pd-recommended-img"
                />
                <p className="pd-recommended-name">{item.title || item.name}</p>
                <p className="pd-recommended-price">₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;