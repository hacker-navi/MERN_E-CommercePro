import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiStar, FiTruck, FiShield } from 'react-icons/fi';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/products');
    }
  };

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    if (quantity > product.stock) {
      toast.error('Quantity exceeds available stock');
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-grid">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.images?.[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
              />
            </div>
            {product.images?.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1>{product.name}</h1>
            {product.brand && <p className="brand">{product.brand}</p>}

            <div className="rating">
              <FiStar className="star-filled" />
              <span className="rating-value">{product.rating || 0}</span>
              <span className="rating-count">({product.numReviews || 0} reviews)</span>
            </div>

            <div className="price-section">
              <span className="current-price">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="discount">
                    {Math.round(
                      ((product.originalPrice - product.price) / product.originalPrice) * 100
                    )}
                    % OFF
                  </span>
                </>
              )}
            </div>

            <p className="description">{product.description}</p>

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div className="selection-group">
                <label>Select Size:</label>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div className="selection-group">
                <label>Select Color:</label>
                <div className="color-options">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="selection-group">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <span className="stock-info">
                {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                className="btn btn--primary btn--full-width"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <button
                className="btn btn--outline btn--full-width"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="product-features">
              <div className="feature">
                <FiTruck />
                <span>Free Delivery on orders above ₹500</span>
              </div>
              <div className="feature">
                <FiShield />
                <span>7 Days Return Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
