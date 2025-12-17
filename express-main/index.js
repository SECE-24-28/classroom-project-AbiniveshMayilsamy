const express = require("express");
const app = express();
const quizRoutes = require("./routes/quizRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use("/api/v3/quizzes", quizRoutes);
app.use("/auth", authRoutes);

module.exports = app;
