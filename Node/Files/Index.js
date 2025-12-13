//fs: fileSystem
const fs = require("fs");

///blocking Code
// 1. path // Encryption
let read = fs.readFileSync("./Files/read.txt", "utf-8");
console.log(read);
console.log("Hello after async code");

// 2. Write a file
//path content // Encryption
fs.writeFileSync(
  "./Files/write.txt",
  "THe file is not here but we are writing it",
  "utf-8"
);

// non-blocking Code
//Async Code
//read data
// path // Encryption // callback function(error, data)
fs.readFile("./Files/read-this.txt", "utf-8", (error, data) => {
  console.log(data);
  fs.readFile(`./Files/${data}`, "utf-8", (error, data1) => {
    console.log(data1);
  });
});
console.log("Hello after async code");

//write data

//path,data,Encryption, callback function(error)

fs.writeFile(
  "./Files/write-this.txt",
  "This is async file write",
  "utf-8",
  (error) => {
    console.log("File is written");
  }
);
console.log("Hello after async code");
