const express = require("express");
const menuRouter = require("./MenuRouter");
const app = express();
app.use(express.json());
app.use("/menu", menuRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
