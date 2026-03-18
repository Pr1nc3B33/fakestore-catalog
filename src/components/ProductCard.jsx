import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartStore';
import './ProductCard.css';

const PLACEHOLDER = 'https://via.placeholder.com/300x300?text=No+Image';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(product.image);
  const [added, setAdded] = useState(false);
  const timerRef = useRef(null);

  // Cleanup timeout on unmount to prevent state updates on unmounted component
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAdd = () => {
    dispatch(addToCart(product));
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 1200);
  };

  const stars = Math.round(product.rating?.rate ?? 0);

  return (
    <article className="product-card">
      <div className="product-card__img-wrap">
        <img
          src={imgSrc}
          alt={product.title}
          className="product-card__img"
          onError={() => setImgSrc(PLACEHOLDER)}
          loading="lazy"
        />
        <span className="product-card__category">{product.category}</span>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__desc">{product.description}</p>
        <div className="product-card__meta">
          <div className="product-card__rating">
            <span className="stars" aria-label={`${stars} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < stars ? 'star star--on' : 'star'} aria-hidden="true">★</span>
              ))}
            </span>
            <span className="rating-text">
              {product.rating?.rate?.toFixed(1)} ({product.rating?.count})
            </span>
          </div>
          <span className="product-card__price">${product.price.toFixed(2)}</span>
        </div>
        <button
          className={`btn-add ${added ? 'btn-add--done' : ''}`}
          onClick={handleAdd}
          aria-label={`Add ${product.title} to cart`}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
