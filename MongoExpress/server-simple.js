const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 9000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let menuItems = [];

// Load data from JSON file
const loadMenuData = () => {
  try {
    const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
    menuItems = [];

    data.forEach((section) => {
      if (section.card?.card?.itemCards) {
        section.card.card.itemCards.forEach((item) => {
          if (item.card?.info) {
            menuItems.push(item.card.info);
          }
        });
      }
    });

    console.log(`Loaded ${menuItems.length} menu items`);
  } catch (error) {
    console.error("Error loading menu data:", error);
  }
};

// Routes
// GET all menu items
app.get("/api/menu", (req, res) => {
  res.json(menuItems);
});

// GET menu items by category
app.get("/api/menu/category/:category", (req, res) => {
  const items = menuItems.filter(
    (item) => item.category?.toLowerCase() === req.params.category.toLowerCase()
  );
  res.json(items);
});

// GET menu item by ID
app.get("/api/menu/:id", (req, res) => {
  const item = menuItems.find((item) => item.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Menu item not found" });
  }
  res.json(item);
});

// POST create new menu item
app.post("/api/menu", (req, res) => {
  const newItem = { ...req.body };
  menuItems.push(newItem);
  res.status(201).json(newItem);
});

// PUT update menu item
app.put("/api/menu/:id", (req, res) => {
  const index = menuItems.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  menuItems[index] = { ...menuItems[index], ...req.body };
  res.json(menuItems[index]);
});

// DELETE menu item
app.delete("/api/menu/:id", (req, res) => {
  const index = menuItems.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  menuItems.splice(index, 1);
  res.json({ message: "Menu item deleted successfully" });
});

// GET categories
app.get("/api/categories", (req, res) => {
  const categories = [...new Set(menuItems.map((item) => item.category))];
  res.json(categories);
});

// Load initial data and start server
loadMenuData();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("GET /api/menu - Get all menu items");
  console.log("GET /api/menu/category/:category - Get items by category");
  console.log("GET /api/menu/:id - Get item by ID");
  console.log("POST /api/menu - Create new item");
  console.log("PUT /api/menu/:id - Update item");
  console.log("DELETE /api/menu/:id - Delete item");
  console.log("GET /api/categories - Get all categories");
});
