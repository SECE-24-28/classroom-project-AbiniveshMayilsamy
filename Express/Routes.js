const express = require("express");
const router = express.Router();
const {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
} = require("./Controller");
router.get("/sri/v3", getAllData);
router.get("/sri/v3/:id", getDataById);
router.post("/sri/v3", createData);
router.put("/sri/v3/:id", updateData);
router.delete("/sri/v3/:id", deleteData);

module.exports = router;
