import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await API.get('/products/featured');
      setFeaturedProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setLoading(false);
    }
  };

  const categories = [
    {
      name: "Men's Wear",
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=500',
      link: '/products?category=men'
    },
    {
      name: "Women's Wear",
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500',
      link: '/products?category=women'
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500',
      link: '/products?category=kids'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500',
      link: '/products?category=accessories'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to NavMall</h1>
            <p>Discover the latest trends in fashion and lifestyle</p>
            <Link to="/products" className="btn btn--primary btn-hero">
              Shop Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link to={category.link} key={index} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FiTrendingUp /> Featured Products
            </h2>
            <Link to="/products" className="view-all-link">
              View All <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            {/* <h2>Get 20% Off on Your First Order!</h2>
            <p>Sign up today and enjoy exclusive deals</p>
            <Link to="/register" className="btn btn--primary">
              Sign Up Now
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
