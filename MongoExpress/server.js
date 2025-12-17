const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/day14db');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Menu Item Schema
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

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Routes
// GET all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET menu items by category
app.get('/api/menu/category/:category', async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET menu item by ID
app.get('/api/menu/:id', async (req, res) => {
  try {
    const item = await MenuItem.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new menu item
app.post('/api/menu', async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update menu item
app.put('/api/menu/:id', async (req, res) => {
  try {
    const item = await MenuItem.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE menu item
app.delete('/api/menu/:id', async (req, res) => {
  try {
    const item = await MenuItem.findOneAndDelete({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST seed data from JSON file
app.post('/api/seed', async (req, res) => {
  try {
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    
    const menuItems = [];
    data.forEach(section => {
      if (section.card?.card?.itemCards) {
        section.card.card.itemCards.forEach(item => {
          if (item.card?.info) {
            menuItems.push(item.card.info);
          }
        });
      }
    });
    
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);
    res.json({ message: `Seeded ${menuItems.length} menu items successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();