import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'men',
    subcategory: '',
    images: '',
    stock: '',
    sizes: '',
    colors: '',
    brand: '',
    isFeatured: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data.products || data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      category: 'men',
      subcategory: '',
      images: '',
      stock: '',
      sizes: '',
      colors: '',
      brand: '',
      isFeatured: false
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      subcategory: product.subcategory || '',
      images: product.images?.join(', ') || '',
      stock: product.stock,
      sizes: product.sizes?.join(', ') || '',
      colors: product.colors?.join(', ') || '',
      brand: product.brand || '',
      isFeatured: product.isFeatured
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      stock: Number(formData.stock),
      images: formData.images.split(',').map(url => url.trim()).filter(url => url),
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()).filter(s => s) : [],
      colors: formData.colors ? formData.colors.split(',').map(c => c.trim()).filter(c => c) : []
    };

    try {
      if (editingProduct) {
        await API.put(`/admin/products/${editingProduct._id}`, productData);
        toast.success('Product updated successfully');
      } else {
        await API.post('/admin/products', productData);
        toast.success('Product created successfully');
      }
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await API.delete(`/admin/products/${id}`);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h1>Manage Products</h1>
        <button onClick={openAddModal} className="btn btn--primary">
          <FiPlus /> Add New Product
        </button>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="product-thumbnail"
                  />
                </td>
                <td>
                  <div className="product-name">{product.name}</div>
                  {product.brand && (
                    <div className="product-brand">{product.brand}</div>
                  )}
                </td>
                <td>
                  <span className="category-badge">
                    {product.category}
                  </span>
                </td>
                <td>₹{product.price.toLocaleString()}</td>
                <td>
                  <span className={`stock-badge ${product.stock === 0 ? 'out-of-stock' : ''}`}>
                    {product.stock}
                  </span>
                </td>
                <td>{product.sold || 0}</td>
                <td>
                  {product.isFeatured ? (
                    <span className="featured-badge">Yes</span>
                  ) : (
                    <span className="not-featured">No</span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => openEditModal(product)}
                      className="btn-icon btn-icon--edit"
                      title="Edit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn-icon btn-icon--delete"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="modal-close">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    className="form-control"
                    value={formData.brand}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="accessories">Accessories</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subcategory</label>
                  <input
                    type="text"
                    name="subcategory"
                    className="form-control"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Original Price (₹)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    className="form-control"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Images (comma-separated URLs)</label>
                <input
                  type="text"
                  name="images"
                  className="form-control"
                  value={formData.images}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Sizes (comma-separated)</label>
                  <input
                    type="text"
                    name="sizes"
                    className="form-control"
                    value={formData.sizes}
                    onChange={handleInputChange}
                    placeholder="XS, S, M, L, XL"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Colors (comma-separated)</label>
                  <input
                    type="text"
                    name="colors"
                    className="form-control"
                    value={formData.colors}
                    onChange={handleInputChange}
                    placeholder="Red, Blue, Green"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                  />
                  <span>Featured Product</span>
                </label>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn--outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
