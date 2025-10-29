import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import "./Home.css"; // Using same styling

const SearchResults = () => {
  const { products, searchQuery } = useSelector((state) => state.products);

  // Prevent runtime error (undefined.toLowerCase())
  const safeSearch = (searchQuery ?? "").toLowerCase();

  const filtered = (products ?? []).filter((product) =>
    (product?.title ?? "").toLowerCase().includes(safeSearch)
  );

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>

      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
