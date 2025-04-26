import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearchQuery } from "../redux/slices/productSlice"; // ✅ import both
import ProductCard from "../components/ProductCard";
import "./Home.css";
import saleBanner from "../assets/salebanner.jpg";


const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // ✅ Clear search query and fetch products on Home load
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  return (
   <div className="home-container">
      <img
  src={saleBanner}
  alt="Sale Banner"
  className="home-banner"
/>


      <h1 className="home-title">Shop Now</h1>

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

export default Home;
