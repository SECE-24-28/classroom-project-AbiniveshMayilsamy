const express = require("express");
const path = require("path");
const app = express();
const port = 9000;

app.use(express.json());

app.use((req, res, next) => {
  req.message = "hi";
  next();
});

app.use("/api", require("./Routes"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
