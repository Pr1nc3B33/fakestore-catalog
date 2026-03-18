import { useSelector } from 'react-redux';
import { selectCartCount } from '../store/cartStore';
import './Navbar.css';

export default function Navbar({ page, setPage }) {
  const count = useSelector(selectCartCount);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => setPage('home')}>
          <span className="logo-icon">🛒</span>
          <span className="logo-text">FakeStore</span>
        </button>
        <nav className="navbar__nav">
          <button
            className={`nav-link ${page === 'home' ? 'nav-link--active' : ''}`}
            onClick={() => setPage('home')}
          >
            Shop
          </button>
          <button
            className={`nav-link nav-link--cart ${page === 'cart' ? 'nav-link--active' : ''}`}
            onClick={() => setPage('cart')}
          >
            Cart
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}