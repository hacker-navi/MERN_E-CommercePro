import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import API from '../utils/api';
import {
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiDollarSign
} from 'react-icons/fi';
//import './AdminDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await API.get('/admin/stats');
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="error">Failed to load dashboard data</div>;
  }

  // Sales by month chart data
  const salesChartData = {
    labels: stats.salesByMonth.map(
      (item) => `${item._id.month}/${item._id.year}`
    ),
    datasets: [
      {
        label: 'Total Sales (₹)',
        data: stats.salesByMonth.map((item) => item.totalSales),
        borderColor: 'rgb(33, 128, 141)',
        backgroundColor: 'rgba(33, 128, 141, 0.1)',
        tension: 0.4
      },
      {
        label: 'Orders',
        data: stats.salesByMonth.map((item) => item.orderCount),
        borderColor: 'rgb(168, 75, 47)',
        backgroundColor: 'rgba(168, 75, 47, 0.1)',
        tension: 0.4,
        yAxisID: 'y1'
      }
    ]
  };

  const salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Sales Trend (Last 12 Months)'
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left'
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  // Sales by category chart
  const categoryChartData = {
    labels: stats.salesByCategory.map((item) => item._id),
    datasets: [
      {
        label: 'Sales by Category',
        data: stats.salesByCategory.map((item) => item.totalSales),
        backgroundColor: [
          'rgba(33, 128, 141, 0.8)',
          'rgba(168, 75, 47, 0.8)',
          'rgba(98, 108, 113, 0.8)',
          'rgba(192, 21, 47, 0.8)',
          'rgba(50, 184, 198, 0.8)',
          'rgba(230, 129, 97, 0.8)'
        ]
      }
    ]
  };

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Sales Distribution by Category'
      }
    }
  };

  // Top products chart
  const topProductsData = {
    labels: stats.topProducts.map((p) => p.name.substring(0, 20)),
    datasets: [
      {
        label: 'Units Sold',
        data: stats.topProducts.map((p) => p.sold),
        backgroundColor: 'rgba(33, 128, 141, 0.8)'
      }
    ]
  };

  const topProductsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Top 5 Products by Sales'
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(33, 128, 141, 0.15)' }}>
            <FiDollarSign style={{ color: 'rgb(33, 128, 141)' }} />
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-value">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(168, 75, 47, 0.15)' }}>
            <FiShoppingBag style={{ color: 'rgb(168, 75, 47)' }} />
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(98, 108, 113, 0.15)' }}>
            <FiPackage style={{ color: 'rgb(98, 108, 113)' }} />
          </div>
          <div className="stat-content">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(192, 21, 47, 0.15)' }}>
            <FiUsers style={{ color: 'rgb(192, 21, 47)' }} />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card chart-card--large">
          <div style={{ height: '400px' }}>
            <Line data={salesChartData} options={salesChartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div style={{ height: '350px' }}>
            <Doughnut data={categoryChartData} options={categoryChartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div style={{ height: '350px' }}>
            <Bar data={topProductsData} options={topProductsOptions} />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.substring(0, 8)}</td>
                  <td>{order.user.name}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalPrice.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-badge--${order.orderStatus}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
