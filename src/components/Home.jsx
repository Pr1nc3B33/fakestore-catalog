import React, { useState } from 'react';
import { useCategories, useProducts } from '../hooks/useApi';
import ProductCard from './ProductCard';
import './Home.css';

export default function Home() {
  const [category, setCategory] = useState('all');

  const { data: categories, isLoading: catsLoading } = useCategories();
  const {
    data: products,
    isLoading: prodsLoading,
    isFetching,
    isError,
    refetch,
  } = useProducts(category);

  // isFetching is true during category transitions (placeholderData keeps old results visible)
  const isTransitioning = isFetching && !prodsLoading;

  return (
    <main className="home">
      <section className="home__hero">
        <h1 className="home__headline">Shop Everything</h1>
        <p className="home__sub">Discover our curated collection across all categories.</p>
      </section>

      <div className="home__toolbar">
        <div className="category-select-wrap">
          <label htmlFor="category-select" className="category-label">
            Browse by category
          </label>
          <select
            id="category-select"
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={catsLoading}
          >
            <option value="all">All Products</option>
            {categories?.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="home__toolbar-right">
          {isTransitioning && <span className="loading-indicator">Loading…</span>}
          {!prodsLoading && !isError && (
            <p className="home__count">
              {products?.length ?? 0} product{products?.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Initial skeleton load */}
      {prodsLoading && (
        <div className="loading-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}

      {/* Error with retry */}
      {isError && (
        <div className="error-msg">
          <span>⚠️</span>
          <span>Failed to load products.</span>
          <button className="retry-btn" onClick={() => refetch()}>
            Try again
          </button>
        </div>
      )}

      {/* Product grid — stays visible during category transitions */}
      {!prodsLoading && !isError && (
        <div className={`product-grid ${isTransitioning ? 'product-grid--fading' : ''}`}>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
