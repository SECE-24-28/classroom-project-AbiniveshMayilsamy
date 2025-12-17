const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");
const menuRoutes = require("./routes/menuRoutes");

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/menu", menuRoutes);

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
