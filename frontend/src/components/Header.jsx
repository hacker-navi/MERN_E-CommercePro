import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiSearch, FiLogOut } from 'react-icons/fi';
import './Header.css';
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <Link to="/" className="logo">
            <h1>NavMall</h1>
          </Link>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FiSearch />
            </button>
          </form>

          <div className="header-actions">
            {user ? (
              <>
                <Link to="/orders" className="header-link">
                  <FiUser />
                  <span>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="header-link logout-btn">
                  <FiLogOut />
                  <span>Logout</span>
                </button>
                {user.role === 'admin' && (
                  <Link to="/admin" className="header-link admin-link">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login" className="header-link">
                <FiUser />
                <span>Login</span>
              </Link>
            )}
            <Link to="/cart" className="header-link cart-link">
              <FiShoppingCart />
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="container">
          <ul className="nav-links">
            <li><Link to="/products?category=men">Men's Wear</Link></li>
            <li><Link to="/products?category=women">Women's Wear</Link></li>
            <li><Link to="/products?category=kids">Kids</Link></li>
            <li><Link to="/products?category=accessories">Accessories</Link></li>
            <li><Link to="/products?category=electronics">Electronics</Link></li>
            <li><Link to="/products?category=home">Home & Living</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
