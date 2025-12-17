const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  imgName: { type: String },
  imageId: { type: String },
  inStock: { type: Number, default: 1 },
  isVeg: { type: Number, default: 1 },
  defaultPrice: { type: Number, required: true },
  rating: { type: String },
  ratingCount: { type: String },
  ratingCountV2: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);