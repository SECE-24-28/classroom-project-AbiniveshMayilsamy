const express = require("express");
const fs = require("fs");
const { STATUS_CODES } = require("http");
const app = express();
app.use(express.json());

// read json file

const jsonData = JSON.parse(fs.readFileSync("abc.json", "utf-8"));
console.log(jsonData);

//  CRUD Operations
// C: Create
// R: Read
// U: Update -> Put and Patch
// D: Delete

app.get("/api/v1/abc/", (req, res) => {
  res.status(200).json({
    status: "success",
    length: jsonData.length,
    data: {
      jsonData,
    },
  });
});

// single data
app.get("/api/v1/abc/single/:id", (req, res) => {
  const id = req.params.id * 1;
  let singleData = jsonData.find((el) => el.id === id);
  //   res.status(200).json({
  //     status: "success",
  //     data: {
  //       singleData,
  //     },
  //   });
  // });
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
});

app.post("/api/v1/abc/single/:id", (req, res) => {
  const id = jsonData.length;
  const newData = Object.assign({ id: id + 1 }, req.body);
  jsonData.push(newData);
  fs.writeFile("abc.json", JSON.stringify(jsonData), "utf-8", (err) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
      res.status(500).json({
        status: "error",
        message: STATUS_CODES[500],
      });
    } else {
      res.status(201).json({
        status: "success",
        data: newData,
        STATUS_CODES: STATUS_CODES[201],
      });
      //showing status code message
      res.status(201).json({
        status: "success",
        data: newData,
        STATUS_CODES: STATUS_CODES[201],
      });
    }
  });
});
// update data
app.put("/api/v1/abc/single/:id", (req, res) => {
  const id = req.params.id * 1;
  let singleData = jsonData.find((el) => el.id === id);
  if (!singleData) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  singleData = Object.assign(singleData, req.body);
  fs.writeFile("abc.json", JSON.stringify(jsonData), "utf-8", (err) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: singleData,
      });
    }
  });
});

const PORT_NO = 9000;
app.listen(PORT_NO, () => {
  console.log("Server is running on port on http://localhost:" + PORT_NO);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
