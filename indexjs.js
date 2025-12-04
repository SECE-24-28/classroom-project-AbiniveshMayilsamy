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
//-----------------------
// namedFun();
//2.Function Expression
// let funcExp = function () {
//   console.log("Function Expression called");
// };

// funcExp();

//----------------------
//3.Arrow Expression
// let arrrow = () => {
//   console.log("Arrow Expression called");
// };
// arrrow();
//---------------------
// //4.callback function and IFFE
// (() => {
//   console.log("callback and IFFE function called");
// })();
// const addTwonumbers = (parameter1, parameter2) => {
//   let num1 = parameter1;
//   let num2 = parameter2;
//   let sum = num1 + num2;
//   console.log("The sum of two number is:", sum);
// };

// addTwonumbers(20, 50);
// addTwonumbers(40, 50);
// addTwonumbers();

// const subTwonumbers = (parameter1, parameter2) => {
//   let num1 = parameter1;
//   let num2 = parameter2;
//   let sum = num1 - num2;
//   console.log(`The sub of two number is:${sum}`, sum);
// };
// subTwonumbers(20, 50);
// subTwonumbers(40, 50);

var k = 10;
console.log(typeof k);

const MultiTwonumbers = (parameter1, parameter2) => {
  let num1 = parameter1;
  let num2 = parameter2;
  let sum = num1 * num2;
  console.log(`The sub of two number is:${sum}`);
};
MultiTwonumbers(20, 50);
MultiTwonumbers(40, 50);

const DivTwonumbers = (parameter1, parameter2) => {
  let num1 = parameter1;
  let num2 = parameter2;
  let sum = num1 / num2;
  console.log(`The sub of two number is:${sum}`);
};
DivTwonumbers(20, 50);
DivTwonumbers(40, 50);
