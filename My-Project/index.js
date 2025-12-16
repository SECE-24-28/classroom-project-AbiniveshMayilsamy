const { time } = require("console");
const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());
let jsonData = JSON.parse(fs.readFileSync("menu.json", "utf-8"));

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
});

// middleware to say just "Hi"
app.use((req, res, next) => {
  console.log("Hi");
  next();
  req.requestTime2 = new Date().toISOString();
  console.log(req.requestTime2);
});
// Controller Logic

const getMenu = (req, res) => {
  let jsonData = JSON.parse(fs.readFileSync("menu.json", "utf-8"));
  res.status(200).json({
    status: "success",
    length: jsonData.length,
    timeOfHit: req.requestTime,
    data: {
      jsonData,
    },
  });
};

const getSingleMenuItem = (req, res) => {
  let jsonData = JSON.parse(fs.readFileSync("menu.json", "utf-8"));
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

const putMenuItem = (req, res) => {
  let jsonData = JSON.parse(fs.readFileSync("menu.json", "utf-8"));
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
};

const deleteMenuItem = (req, res) => {
  let jsonData = JSON.parse(fs.readFileSync("menu.json", "utf-8"));
  const id = req.params.id;
  let deleted = false;
  timeOfHit = req.requestTime;
  for (const section of jsonData) {
    if (section.card && section.card.card && section.card.card.itemCards) {
      const index = section.card.card.itemCards.findIndex(
        (item) => item.card.info.id === id
      );
      if (index !== -1) {
        section.card.card.itemCards.splice(index, 1);
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

const updateMenuItem = (req, res) => {
  let jsonData = JSON.parse(fs.readFileSync("menu.json", "utf-8"));
  timeOfHit = req.requestTime;

  const newItem = {
    card: {
      info: Object.assign({ id: String(Date.now()) }, req.body),
    },
  };
  if (
    jsonData.length > 0 &&
    jsonData[0].card &&
    jsonData[0].card.card &&
    jsonData[0].card.card.itemCards
  ) {
    jsonData[0].card.card.itemCards.push(newItem);
  } else {
    jsonData.push(newItem);
  }
};

// Route Definitions
// app.get("/api/v1/menu/", getMenu);
// app.get("/api/v1/menu/single/:id", getSingleMenuItem);
// app.put("/api/v1/menu/single/:id", putMenuItem);
// app.delete("/api/v1/menu/single/:id", deleteMenuItem);
// app.post("/api/v1/menu/single", updateMenuItem);
const menuRouter = express.Router();

menuRouter.route("/").get(getMenu);
menuRouter
  .route("/single/:id")
  .get(getSingleMenuItem)
  .put(putMenuItem)
  .delete(deleteMenuItem);
menuRouter.route("/single").post(updateMenuItem);

app.use("/api/v1/menu", menuRouter);

// The following code is commented out to illustrate the previous inline implementation
// of the routes before refactoring to use controller functions.

// app.get("/api/v1/menu/", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     length: jsonData.length,
//     data: {
//       jsonData,
//     },
//   });
// });

// app.get("/api/v1/menu/single/:id", (req, res) => {
//   const id = req.params.id;
//   let singleData = null;

//   for (const section of jsonData) {
//     if (section.card && section.card.card && section.card.card.itemCards) {
//       const foundItem = section.card.card.itemCards.find(
//         (item) => item.card.info.id === id
//       );
//       if (foundItem) {
//         singleData = foundItem.card.info;
//         break;
//       }
//     }
//   }

//   if (!singleData) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     data: {
//       singleData,
//     },
//   });
// });

// app.post("/api/v1/menu/single", (req, res) => {
//   const newItem = {
//     card: {
//       info: Object.assign({ id: String(Date.now()) }, req.body),
//     },
//   };

//   if (
//     jsonData.length > 0 &&
//     jsonData[0].card &&
//     jsonData[0].card.card &&
//     jsonData[0].card.card.itemCards
//   ) {
//     jsonData[0].card.card.itemCards.push(newItem);
//   } else {
//     jsonData.push(newItem);
//   }

//   fs.writeFile("menu.json", JSON.stringify(jsonData), "utf-8", (err) => {
//     if (err) {
//       return res.status(500).json({
//         status: "error",
//         message: "Internal Server Error",
//       });
//     }
//     res.status(201).json({
//       status: "success",
//       data: newItem.card.info,
//     });
//   });
// });

// app.put("/api/v1/menu/single/:id", (req, res) => {
//   const id = req.params.id;
//   let foundItemInfo = null;

//   for (const section of jsonData) {
//     if (section.card && section.card.card && section.card.card.itemCards) {
//       const item = section.card.card.itemCards.find(
//         (i) => i.card.info.id === id
//       );
//       if (item) {
//         Object.assign(item.card.info, req.body);
//         foundItemInfo = item.card.info;
//         break;
//       }
//     }
//   }

//   if (!foundItemInfo) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }

//   fs.writeFile("menu.json", JSON.stringify(jsonData), "utf-8", (err) => {
//     if (err) {
//       return res.status(500).json({
//         status: "error",
//         message: "Internal Server Error",
//       });
//     }
//     res.status(200).json({
//       status: "success",
//       data: foundItemInfo,
//     });
//   });
// });

// app.delete("/api/v1/menu/single/:id", (req, res) => {
//   const id = req.params.id;
//   let deleted = false;

//   for (const section of jsonData) {
//     if (section.card && section.card.card && section.card.card.itemCards) {
//       const index = section.card.card.itemCards.findIndex(
//         (item) => item.card.info.id === id
//       );
//       if (index !== -1) {
//         section.card.card.itemCards.splice(index, 1);
//         deleted = true;
//         break;
//       }
//     }
//   }

//   if (!deleted) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }

//   fs.writeFile("menu.json", JSON.stringify(jsonData), "utf-8", (err) => {
//     if (err) {
//       return res.status(500).json({
//         status: "error",
//         message: "Internal Server Error",
//       });
//     }
//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   });
// });

const PORT_NO = 9000;
app.listen(PORT_NO, () => {
  console.log("Server is running on http://localhost:" + PORT_NO);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
