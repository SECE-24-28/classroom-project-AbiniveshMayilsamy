const MenuItem = require('../models/MenuItem');
const fs = require('fs');

// Get all menu items
exports.getAllItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await MenuItem.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get items by category
exports.getItemsByCategory = async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.category });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new item
exports.createItem = async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await MenuItem.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await MenuItem.findOneAndDelete({ id: req.params.id });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Seed data
exports.seedData = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    
    const menuItems = [];
    let counter = 1;
    
    data.forEach(section => {
      if (section.card?.card?.itemCards) {
        section.card.card.itemCards.forEach(item => {
          if (item.card?.info) {
            const menuItem = { ...item.card.info };
            if (menuItems.find(existing => existing.id === menuItem.id)) {
              menuItem.id = `${menuItem.id}_${counter++}`;
            }
            menuItems.push(menuItem);
          }
        });
      }
    });
    
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);
    res.json({ 
      success: true, 
      message: `Seeded ${menuItems.length} items successfully` 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};