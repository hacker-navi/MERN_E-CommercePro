const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['men', 'women', 'kids', 'accessories', 'electronics', 'home']
  },
  subcategory: {
    type: String
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  sizes: [{
    type: String,
    enum: [
    'XS', 'S', 'M', 'L', 'XL', 'XXL',
    '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36', '38', '40', '42',
    '4-5 Y', '5-6 Y', '6-7 Y', '7-8 Y', '8-9 Y', '9-10 Y', '10-11 Y', '11-12 Y', '13-14 Y','2-3 Y', '3-4 Y','0-1 Y','1-2 Y'
]

  }],
  colors: [{
    type: String
  }],
  brand: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sold: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

module.exports = mongoose.model('Product', productSchema);
