import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice"; // ✅ import your cart action
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const found = allProducts?.find((p) => p.id?.toString() === id);
    if (found) {
      setProduct(found);
    }
  }, [allProducts, id]);

  if (!product) return <p className="loading">Loading or product not found...</p>;

  const isClothing = product.category?.toLowerCase() === "clothing";

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    };

    dispatch(addToCart(itemToAdd)); // ✅ add to redux store

    alert(`Added "${product.name}" to cart ${selectedSize ? ` - Size: ${selectedSize}` : ""}`);
  };

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.name} className="product-detail-image" />

      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>

        {isClothing && (
          <div className="size-options">
            <label>Select Size:</label>
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Choose</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
        )}

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={isClothing && !selectedSize}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
