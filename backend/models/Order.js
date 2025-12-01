const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    size: String,
    color: String,
    price: {
      type: Number,
      required: true
    },
    image: String
  }],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['card', 'upi', 'netbanking', 'cod']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String
  },
  itemsPrice: {
    type: Number,
    required: true
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: Date,
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
