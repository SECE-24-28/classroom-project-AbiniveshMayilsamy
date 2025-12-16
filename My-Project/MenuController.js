const fs = require("fs");

const jsonData = JSON.parse(fs.readFileSync("menu.json", "utf-8"));
console.log("MenuController loaded and menu.json parsed.");

exports.getMenu = (req, res) => {
  res.status(200).json({
    status: "success",
    length: jsonData.length,
    msg: "Menu fetched successfully",
    timeOfHit: req.requestTime,
    data: {
      jsonData,
    },
  });
};

exports.getSingleMenuItem = (req, res) => {
  const id = req.params.id;
  let singleData = null;
  timeOfHit = req.requestTime;
  for (const section of jsonData) {
    if (section.card && section.card.card && section.card.card.itemCards) {
      const foundItem = section.card.card.itemCards.find(
        (item) => item.card.info.id === id
      );
      if (foundItem) {
        singleData = foundItem.card.info;
        break;
      }
    }
  }
  if (!singleData) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      singleData,
    },
  });
};

exports.putMenuItem = (req, res) => {
  const id = req.params.id;
  let foundItemInfo = null;
  timeOfHit = req.requestTime;
  for (const section of jsonData) {
    if (section.card && section.card.card && section.card.card.itemCards) {
      const item = section.card.card.itemCards.find(
        (i) => i.card.info.id === id
      );
      if (item) {
        Object.assign(item.card.info, req.body);
        foundItemInfo = item.card.info;
        break;
      }
    }
  }
  if (!foundItemInfo) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
};

exports.deleteMenuItem = (req, res) => {
  const id = req.params.id;
  let deleted = false;
  timeOfHit = req.requestTime;
  for (const section of jsonData) {
    if (section.card && section.card.card && section.card.card.itemCards) {
      const itemIndex = section.card.card.itemCards.findIndex(
        (i) => i.card.info.id === id
      );
      if (itemIndex !== -1) {
        section.card.card.itemCards.splice(itemIndex, 1);
        deleted = true;
        break;
      }
    }
  }
  if (!deleted) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
};
