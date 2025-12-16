const fs = require("fs");
const path = require("path");
class SriModel {
  constructor() {
    this.dataPath = path.join(__dirname, "sri.json");
  }
  getAllData() {
    try {
      const data = fs.readFileSync(this.dataPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error reading data: " + error.message);
    }
  }
  getDataById(id) {
    try {
      const data = this.getAllData();
      const item = data.find((item) => item.id == id);
      return item || null;
    } catch (error) {
      throw new Error("Error fetching data: " + error.message);
    }
  }
  addData(newItem) {
    try {
      const data = this.getAllData();
      const maxId = Math.max(...data.map((item) => item.id), 0);
      newItem.id = maxId + 1;
      data.push(newItem);
      fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
      return newItem;
    } catch (error) {
      throw new Error("Error adding data: " + error.message);
    }
  }
  updateDataById(id, updatedItem) {
    try {
      const data = this.getAllData();
      const index = data.findIndex((item) => item.id == id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updatedItem, id: parseInt(id) };
        fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
        return data[index];
      }
      return null;
    } catch (error) {
      throw new Error("Error updating data: " + error.message);
    }
  }
  deleteDataById(id) {
    try {
      const data = this.getAllData();
      const index = data.findIndex((item) => item.id == id);
      if (index !== -1) {
        const deletedItem = data[index];
        data.splice(index, 1);
        fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2));
        return deletedItem;
      }
      return null;
    } catch (error) {
      throw new Error("Error deleting data: " + error.message);
    }
  }
}

module.exports = new SriModel();
