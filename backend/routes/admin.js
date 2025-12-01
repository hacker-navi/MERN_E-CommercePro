const express = require('express');
const router = express.Router();
const { 
  getDashboardStats,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/stats', protect, admin, getDashboardStats);
router.post('/products', protect, admin, createProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
