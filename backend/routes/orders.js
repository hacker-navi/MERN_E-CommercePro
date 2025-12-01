const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  getMyOrders,
  updateOrderToPaid 
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

module.exports = router;
