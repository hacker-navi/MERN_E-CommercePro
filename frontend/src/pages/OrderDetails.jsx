import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { FiPackage, FiMapPin, FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import './OrderDetails.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order:', error);
      setLoading(false);
      navigate('/orders');
    }
  };

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
  }

  const getStatusSteps = () => {
    const steps = [
      { key: 'pending', label: 'Order Placed' },
      { key: 'confirmed', label: 'Confirmed' },
      { key: 'processing', label: 'Processing' },
      { key: 'shipped', label: 'Shipped' },
      { key: 'delivered', label: 'Delivered' }
    ];

    const currentIndex = steps.findIndex(step => step.key === order.orderStatus);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  return (
    <div className="order-detail-page">
      <div className="container">
        <div className="order-detail-header">
          <div>
            <h1>Order Details</h1>
            <p className="order-id">Order ID: #{order._id}</p>
            <p className="order-date">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <button onClick={() => navigate('/orders')} className="btn btn--outline">
            Back to Orders
          </button>
        </div>

        {/* Order Status Timeline */}
        <div className="order-timeline">
          <div className="timeline-steps">
            {getStatusSteps().map((step, index) => (
              <div
                key={step.key}
                className={`timeline-step ${step.completed ? 'completed' : ''} ${
                  step.active ? 'active' : ''
                }`}
              >
                <div className="timeline-circle">
                  {step.completed && <FiCheckCircle />}
                </div>
                <div className="timeline-label">{step.label}</div>
                {index < getStatusSteps().length - 1 && (
                  <div className="timeline-line"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="order-detail-grid">
          {/* Order Items */}
          <div className="order-section">
            <h2>
              <FiPackage /> Order Items
            </h2>
            <div className="order-items-list">
              {order.orderItems.map((item, index) => (
                <div key={index} className="order-item-detail">
                  <img src={item.image || '/placeholder.jpg'} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    {(item.size || item.color) && (
                      <p className="item-variants">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && ' | '}
                        {item.color && `Color: ${item.color}`}
                      </p>
                    )}
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-sidebar">
            {/* Shipping Address */}
            <div className="order-info-card">
              <h3>
                <FiMapPin /> Shipping Address
              </h3>
              <address>
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                {order.shippingAddress.zipCode}<br />
                {order.shippingAddress.country}
              </address>
            </div>

            {/* Payment Info */}
            <div className="order-info-card">
              <h3>
                <FiCreditCard /> Payment Information
              </h3>
              <p className="payment-method">
                Method: {order.paymentMethod.toUpperCase()}
              </p>
              <p className={`payment-status ${order.isPaid ? 'paid' : 'unpaid'}`}>
                Status: {order.isPaid ? 'Paid' : 'Pending'}
              </p>
              {order.isPaid && (
                <p className="payment-date">
                  Paid on {new Date(order.paidAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="order-info-card">
              <h3>Order Summary</h3>
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{order.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Tax</span>
                  <span>₹{order.taxPrice.toFixed(2)}</span>
                </div>
                <div className="price-row">
                  <span>Shipping</span>
                  <span>
                    {order.shippingPrice === 0
                      ? 'FREE'
                      : `₹${order.shippingPrice.toFixed(2)}`}
                  </span>
                </div>
                <div className="price-divider"></div>
                <div className="price-row price-total">
                  <span>Total</span>
                  <span>₹{order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
