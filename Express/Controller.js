const SriModel = require("./Model");

// Get all data
const getAllData = (req, res) => {
  try {
    const data = SriModel.getAllData();
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get data by ID
const getDataById = (req, res) => {
  try {
    const id = req.params.id;
    const data = SriModel.getDataById(id);
    if (data) {
      res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create new data
const createData = (req, res) => {
  try {
    const newItem = req.body;
    if (!newItem.title || !newItem.description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }
    const createdItem = SriModel.addData(newItem);
    res.status(201).json({
      success: true,
      message: "Data created successfully",
      data: createdItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update data by ID
const updateData = (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = req.body;
    const data = SriModel.updateDataById(id, updatedItem);
    if (data) {
      res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete data by ID
const deleteData = (req, res) => {
  try {
    const id = req.params.id;
    const data = SriModel.deleteDataById(id);
    if (data) {
      res.status(200).json({
        success: true,
        message: "Data deleted successfully",
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
};
