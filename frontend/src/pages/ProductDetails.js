import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/slices/wishlistSlice";
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { fetchSimilarProducts } from "../services/api";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Handle both MongoDB _id and numeric id
  const isWished = wishlist.some(
    (item) => item._id === id || item.id?.toString() === id
  );

  // ✅ Find product by either numeric ID or MongoDB _id
  useEffect(() => {
    const found = allProducts?.find(
      (p) => p._id === id || p.id?.toString() === id
    );

    if (found) {
      setProduct(found);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // 🧠 Fallback fetch if product not in Redux
      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) setProduct(data);
        })
        .catch((err) =>
          console.error("❌ Failed to fetch product details:", err)
        );
    }
  }, [allProducts, id]);

  // ✅ Fetch similar products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSimilarProducts(product.id || product._id);
        setSimilarProducts(data);
      } catch (err) {
        console.error("❌ Error fetching similar products:", err);
      }
    };

    if (product) fetchData();
  }, [product]);

  // ✅ Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg("Please select a size.");
      return;
    }

    const itemToAdd = {
      id: product._id || product.id,
      name: product.title || product.name,
      price: product.price,
      image:
        product.thumbnail ||
        (product.images && product.images[0]) ||
        product.image,
      size: selectedSize,
      quantity: 1,
    };

    dispatch(addToCart(itemToAdd));
    alert(
      `Added "${product.title || product.name}" to cart - Size: ${selectedSize}`
    );
    setErrorMsg("");
  };

  // ✅ Wishlist toggle
  const toggleWishlist = () => {
    if (!product) return;
    if (isWished) {
      dispatch(removeFromWishlist(product._id || product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // ✅ Loading state
  if (!product)
    return <p className="pd-loading">Loading or product not found...</p>;

  const discount =
    product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : product.discountPercentage || 0;

  const mainImage =
    product.thumbnail ||
    (product.images && product.images[0]) ||
    product.image ||
    "/placeholder.jpg";

  const productName = product.title || product.name || "Unnamed Product";

  // ✅ Scroll logic for carousel
  const scrollLeft = () => {
    document
      .getElementById("similar-scroll")
      .scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    document
      .getElementById("similar-scroll")
      .scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="pd-container">
      <img src={mainImage} alt={productName} className="pd-image" />

      <div className="pd-info">
        <p className="pd-brand-name">{product.brand}</p>
        <h2 className="pd-title">{productName}</h2>

        <div className="pd-price-row">
          <span className="pd-discounted-price">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="pd-original-price">
                ₹{product.originalPrice}
              </span>
              <span className="pd-discount-label">{discount}% OFF</span>
            </>
          )}
        </div>

        <p className="pd-description">{product.description}</p>

        {/* 👕 Size Selection */}
        <div className="pd-size-options-box">
          <p className="pd-size-label">Select Size:</p>
          <div className="pd-size-button-group">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`pd-size-btn ${
                  selectedSize === size ? "pd-size-selected" : ""
                }`}
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

        {/* ❤️ Wishlist + 🛒 Add to Cart */}
        <div className="pd-actions">
          <button className="pd-wishlist-btn" onClick={toggleWishlist}>
            {isWished ? <FaHeart color="red" /> : <FaRegHeart />} Wishlist
          </button>

          <button className="pd-add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* 🧠 AI-Powered Similar Products Carousel */}
      {similarProducts.length > 0 && (
        <div className="pd-recommendations-section">
          <h3 className="pd-recommendations-title">Similar Products</h3>

          {/* Scroll Buttons */}
          <div className="pd-carousel-controls">
            <button onClick={scrollLeft} className="pd-scroll-btn left">
              <FaChevronLeft />
            </button>
            <button onClick={scrollRight} className="pd-scroll-btn right">
              <FaChevronRight />
            </button>
          </div>

          {/* Scrollable container */}
          <div id="similar-scroll" className="pd-recommendation-list scrollable">
            {similarProducts.map((item) => (
              <Link
                key={item._id || item.id}
                to={`/product/${item._id || item.id}`}
                className="pd-recommended-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
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
                <p className="pd-recommended-name">
                  {item.title || item.name}
                </p>
                <p className="pd-recommended-price">₹{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
