import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
// import './CategoryPage.css';

const CategoryPage = () => {
  const { gender, subcategory } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const allProducts = res.data;

        const filtered = allProducts.filter(
          (product) =>
            product?.gender?.toLowerCase() === gender.toLowerCase() &&
            product?.subcategory?.toLowerCase() === subcategory.toLowerCase()
        );

        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Failed to fetch products:', error.message);
      }
    };

    fetchProducts();
  }, [gender, subcategory]);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="category-page">
      <h2>{capitalize(gender)} — {capitalize(subcategory)}</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
