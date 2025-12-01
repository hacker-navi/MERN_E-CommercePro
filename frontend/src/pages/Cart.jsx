import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <FiShoppingBag className="empty-icon" />
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <Link to="/products" className="btn btn--primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart ({cartItems.length} items)</h1>
          <button onClick={clearCart} className="btn btn--outline btn--sm">
            Clear Cart
          </button>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={`${item._id}-${item.size}-${item.color}`} className="cart-item">
                <div className="cart-item__image">
                  <img src={item.images?.[0] || '/placeholder.jpg'} alt={item.name} />
                </div>

                <div className="cart-item__details">
                  <Link to={`/products/${item._id}`} className="cart-item__name">
                    {item.name}
                  </Link>
                  {item.brand && <p className="cart-item__brand">{item.brand}</p>}
                  
                  <div className="cart-item__variants">
                    {item.size && (
                      <span className="variant-tag">Size: {item.size}</span>
                    )}
                    {item.color && (
                      <span className="variant-tag">Color: {item.color}</span>
                    )}
                  </div>

                  <div className="cart-item__price">
                    <span className="price-label">Price:</span>
                    <span className="price-value">₹{item.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="cart-item__actions">
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1, item.size, item.color)
                      }
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1, item.size, item.color)
                      }
                      className="quantity-btn"
                      disabled={item.quantity >= item.stock}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <div className="cart-item__total">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id, item.size, item.color)}
                    className="remove-btn"
                    aria-label="Remove item"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Tax (1% GST)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>

            {shipping > 0 && (
              <p className="shipping-note">
                Add ₹{(500 - subtotal).toFixed(2)} more to get FREE shipping!
              </p>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            
            <div className="cart-summary__actions">
  <Link to="/checkout" className="btn btn--primary btn--full-width">
    Proceed to Checkout
  </Link>

  <Link to="/products" className="btn btn--outline btn--full-width">
    Continue Shopping
  </Link>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
