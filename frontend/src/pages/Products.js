// frontend/src/pages/Products.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice"; 
import ProductCard from "../components/ProductCard";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products on mount
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>All Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
