import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  selectCheckoutSuccess,
  removeFromCart,
  updateQuantity,
  checkout,
  dismissCheckoutSuccess,
} from '../store/cartStore';
import './Cart.css';

const PLACEHOLDER = 'https://via.placeholder.com/80x80?text=No+Image';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);
  const checkoutSuccess = useSelector(selectCheckoutSuccess);

  const isEmpty = items.length === 0;

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        {/* Checkout success banner — shown after checkout regardless of empty state */}
        {checkoutSuccess && (
          <div className="checkout-banner" role="status">
            <span className="checkout-banner__icon">🎉</span>
            <div>
              <strong>Order placed successfully!</strong>
              <p>Your cart has been cleared. Thank you for shopping with us!</p>
            </div>
            <button
              className="checkout-banner__close"
              onClick={() => dispatch(dismissCheckoutSuccess())}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        {/* Empty state — only shown when no checkout success is displayed */}
        {isEmpty && !checkoutSuccess && (
          <div className="cart-empty">
            <span className="cart-empty__icon" aria-hidden="true">🛍️</span>
            <h2>Your cart is empty</h2>
            <p>Head over to the store and add some products!</p>
          </div>
        )}

        {/* Cart items + summary — shown whenever there are items */}
        {!isEmpty && (
          <>
            <div className="cart-items" role="list">
              {items.map((item) => (
                <div key={item.id} className="cart-item" role="listitem">
                  <div className="cart-item__img-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item__img"
                      onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
                    />
                  </div>
                  <div className="cart-item__info">
                    <h3 className="cart-item__title">{item.title}</h3>
                    <p className="cart-item__unit">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="cart-item__controls">
                    <div className="qty-control" role="group" aria-label={`Quantity for ${item.title}`}>
                      <button
                        className="qty-btn"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, count: item.count - 1 }))
                        }
                      >
                        −
                      </button>
                      <span className="qty-value" aria-live="polite">{item.count}</span>
                      <button
                        className="qty-btn"
                        aria-label="Increase quantity"
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, count: item.count + 1 }))
                        }
                      >
                        +
                      </button>
                    </div>
                    <span className="cart-item__subtotal">
                      ${(item.price * item.count).toFixed(2)}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Total items</span>
                <strong>{count}</strong>
              </div>
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total price</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
              <button className="btn-checkout" onClick={() => dispatch(checkout())}>
                Checkout — ${total.toFixed(2)}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
