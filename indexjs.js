// console.log(a);
// //hoisting
// var a = 10;
// // global scope
// console.log(a);
// //ES6
// //let and const
// //reference error
// // temporal dead zone
// let b = 20;
// //console.log(b);
// b = 130;
// //block scope
// console.log(b);
// console.log(c);
// const c=40;
// c=70;

// <----JavaScript Functions------->
//1.Named Function
// function namedFun() {
//   console.log("Named Function called");
//   console.log("Named Function called");
//   console.log("Named Function called");
// }

// namedFun();
//2.Function Expression
let funcExp = function () {
  console.log("Function Expression called");
};

funcExp();
