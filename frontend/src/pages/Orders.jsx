import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import { FiPackage, FiClock, FiTruck, FiCheckCircle } from 'react-icons/fi';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/myorders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock className="status-icon status-pending" />;
      case 'confirmed':
      case 'processing':
        return <FiPackage className="status-icon status-processing" />;
      case 'shipped':
        return <FiTruck className="status-icon status-shipped" />;
      case 'delivered':
        return <FiCheckCircle className="status-icon status-delivered" />;
      default:
        return <FiClock className="status-icon" />;
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <FiPackage className="empty-icon" />
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here</p>
            <Link to="/products" className="btn btn--primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <Link
                to={`/orders/${order._id}`}
                key={order._id}
                className="order-card"
              >
                <div className="order-header">
                  <div className="order-id">
                    <span className="order-label">Order ID:</span>
                    <span className="order-value">#{order._id.substring(0, 10)}</span>
                  </div>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <div className="order-body">
                  <div className="order-items">
                    {order.orderItems.slice(0, 3).map((item, index) => (
                      <div key={index} className="order-item-preview">
                        <img
                          src={item.image || '/placeholder.jpg'}
                          alt={item.name}
                        />
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <div className="order-item-more">
                        +{order.orderItems.length - 3} more
                      </div>
                    )}
                  </div>

                  <div className="order-details">
                    <div className="order-info">
                      <span className="order-label">Total Amount:</span>
                      <span className="order-amount">
                        ₹{order.totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="order-info">
                      <span className="order-label">Items:</span>
                      <span>{order.orderItems.length}</span>
                    </div>
                  </div>
                </div>

                <div className="order-footer">
                  <div className="order-status">
                    {getStatusIcon(order.orderStatus)}
                    <span className={`status-text status-${order.orderStatus}`}>
                      {order.orderStatus.charAt(0).toUpperCase() +
                        order.orderStatus.slice(1)}
                    </span>
                  </div>
                  <button className="btn btn--outline btn--sm">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
