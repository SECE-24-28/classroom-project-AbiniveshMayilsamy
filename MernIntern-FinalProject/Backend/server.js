const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(cors());
app.use(express.json());

let serverStatus = {
  backend: { connected: true, message: "Backend Running" },
  database: { connected: false, message: "Using Local Storage (MongoDB not connected)" }
};

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Quiz Portal API Server" });
});

app.get("/api/status", (req, res) => {
  res.json(serverStatus);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Database: Using Local Storage");
});
