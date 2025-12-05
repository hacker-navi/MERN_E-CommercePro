import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-card__link">
        <div className="product-card__image">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            loading="lazy"
          />
          {discountPercentage > 0 && (
            <span className="product-card__badge">{discountPercentage}% OFF</span>
          )}
          {product.stock === 0 && (
            <span className="product-card__badge product-card__badge--sold">
              Out of Stock
            </span>
          )}
        </div>

        <div className="product-card__content">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__brand">{product.brand}</p>

          <div className="product-card__rating">
            <FiStar className="star-icon" />
            <span>{product.rating || 0}</span>
            <span className="reviews-count">({product.numReviews || 0})</span>
          </div>

          <div className="product-card__price">
            <span className="price-current">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {product.stock > 0 && product.stock < 10 && (
            <p className="product-card__stock-warning">
              Only {product.stock} left in stock!
            </p>
          )}
        </div>
      </Link>

      <button
        className="product-card__add-btn btn btn--primary"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        <FiShoppingCart />
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
