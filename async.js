// // setTimeout(() => {
// //   console.log("setTimeout Function");
// // }, 2000);

// // const { log } = require("async");

// // //callback AND timer

// // console.log("Hello World");

// // // callback hell
// // //nested callbacks

// // setTimeout(() => {
// //   console.log("setTimeout Function 1");
// //   setTimeout(() => {
// //     console.log("setTimeout Function 2");
// //     setTimeout(() => {
// //       console.log("setTimeout Function 3");
// //       setTimeout(() => {
// //         console.log("setTimeout Function 4");
// //         setTimeout(() => {
// //           console.log("setTimeout Function 5");
// //         }, 2000);
// //       }, 2000);
// //     }, 2000);
// //   }, 2000);
// // }, 2000);

// //promises states : pending, fulfolled(res), rejected(rej)

// let myPromise = new Promise((res, rej) => {
//   let mark = 40;
//   if (mark >= 60) {
//     res("Student is Passed");
//   } else {
//     rej("Student is Rejected");
//   }
// });

// // ways to call Promise
// //.then() and .catch

// myPromise
//   .then((a) => {
//     console.log(a);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Async and Await
// // no errror Handling

// let handlePromise = async () => {
//   try {
//     console.log();
//     let response = await myPromise;
//     console.log(response);
//     console.log("anything");
//   } catch (err) {
//     console.log(err);
//   } finally {
//     console.log("Execution Completed");
//   }
// };
// handlePromise();

// fetch API

let fetchData = async () => {
  try {
    let response = await fetch("http://jsonplaceholder.typicode.com/todos");
    console.log(response);
    const data = await response.json();
    console.log("value is ", data);
  } catch {
    console.log(err);
  }
};

fetchData();
