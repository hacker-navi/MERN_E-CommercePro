import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import { FiHome, FiPackage, FiShoppingBag } from 'react-icons/fi';
import './Admin.css';

const Admin = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="admin-page">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h2>Admin Panel</h2>
          </div>
          <nav className="admin-nav">
            <Link
              to="/admin"
              className={`admin-nav-link ${isActive('/admin') && location.pathname === '/admin' ? 'active' : ''}`}
            >
              <FiHome /> Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={`admin-nav-link ${isActive('/admin/products') ? 'active' : ''}`}
            >
              <FiPackage /> Products
            </Link>
            <Link
              to="/admin/orders"
              className={`admin-nav-link ${isActive('/admin/orders') ? 'active' : ''}`}
            >
              <FiShoppingBag /> Orders
            </Link>
          </nav>
        </aside>

        <main className="admin-content">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Admin;
