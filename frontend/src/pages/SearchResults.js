import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import "./Home.css"; // Use same styling

const SearchResults = () => {
  const { products, searchQuery } = useSelector((state) => state.products);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
