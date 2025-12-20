const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, getDBStatus } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Quiz Portal API Server" });
});

app.get("/api/status", (req, res) => {
  res.json({
    backend: { connected: true, message: "Backend Running" },
    database: getDBStatus()
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
