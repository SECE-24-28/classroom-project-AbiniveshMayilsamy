const express = require("express");
const app = express();
const PORT = 9000;

app.use(express.json());

// Sample menu data
let menuData = [
  {
    id: "120582089",
    name: "La Mushroom Pizza",
    category: "Pizza",
    description: "Farm Mushroom freshly baked Pizza",
    imgName: "pizza.jpeg",
    inStock: 1,
    isVeg: 1,
    defaultPrice: 12500,
    rating: "4.3",
  },
  {
    id: "120582112",
    name: "La Capsicum Pizza",
    category: "Pizza",
    description: "Roasted capsicum freshly baked Pizza",
    imgName: "food.jpeg",
    inStock: 1,
    isVeg: 1,
    defaultPrice: 12500,
  },
  {
    id: "120582259",
    name: "Pizza Combo",
    category: "Family Combo",
    description: '7" Pizza + Potato Wedges + Pepsi + Choco Lava Cake',
    imgName: "food.jpeg",
    inStock: 1,
    isVeg: 1,
    defaultPrice: 54900,
  },
];

// GET all menu items
app.get("/api/menu", (req, res) => {
  res.json({
    success: true,
    data: menuData,
    count: menuData.length,
  });
});

// GET menu item by ID
app.get("/api/menu/:id", (req, res) => {
  const item = menuData.find((item) => item.id === req.params.id);
  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }
  res.json({
    success: true,
    data: item,
  });
});

// POST create new menu item
app.post("/api/menu", (req, res) => {
  const newItem = {
    id: Date.now().toString(),
    ...req.body,
  };
  menuData.push(newItem);
  res.status(201).json({
    success: true,
    data: newItem,
    message: "Menu item created successfully",
  });
});

// PUT update menu item
app.put("/api/menu/:id", (req, res) => {
  const index = menuData.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  menuData[index] = { ...menuData[index], ...req.body };
  res.json({
    success: true,
    data: menuData[index],
    message: "Menu item updated successfully",
  });
});

// DELETE menu item
app.delete("/api/menu/:id", (req, res) => {
  const index = menuData.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Menu item not found",
    });
  }

  menuData.splice(index, 1);
  res.json({
    success: true,
    message: "Menu item deleted successfully",
  });
});

// GET categories
app.get("/api/categories", (req, res) => {
  const categories = [...new Set(menuData.map((item) => item.category))];
  res.json({
    success: true,
    data: categories,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
