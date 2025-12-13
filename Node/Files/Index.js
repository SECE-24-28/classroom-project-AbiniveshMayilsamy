// //fs: fileSystem
const fs = require("fs");
const http = require("http");
// ///blocking Code
// // 1. path // Encryption
// let read = fs.readFileSync("./Files/read.txt", "utf-8");
// console.log(read);
// console.log("Hello after async code");

// // 2. Write a file
// //path content // Encryption
// fs.writeFileSync(
//   "./Files/write.txt",
//   "THe file is not here but we are writing it",
//   "utf-8"
// );

// // non-blocking Code
// //Async Code
// //read data
// // path // Encryption // callback function(error, data)
// fs.readFile("./Files/read-this.txt", "utf-8", (error, data) => {
//   console.log(data);
//   fs.readFile(`./Files/${data}`, "utf-8", (error, data1) => {
//     console.log(data1);
//   });
// });
// console.log("Hello after async code");

// //write data

// //path,data,Encryption, callback function(error)

// fs.writeFile(
//   "./Files/write-this.txt",
//   "This is async file write",
//   "utf-8",
//   (error) => {
//     console.log("File is written");
//   }
// );
// console.log("Hello after async code");

//http status codes
// 1xx-199 - information
// 2xx-299 - success
// 3xx-399 - redirection
// 4xx-499 - client error
// 5xx-599 - server error
// fs module -> file system module
// blocking -> sync -> synchronous
// non-blocking -> async -> asynchronous

// we have to create a server

let htmlData = fs.readFileSync("./Files/index.html", "utf-8");

const server = http.createServer((req, res) => {
  res.end(htmlData);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to the port no 8000");
});
