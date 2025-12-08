//Q1

function createArray(arg1, arg2, arg3) {
  return [arg1, arg2, arg3];
}

console.log(createArray(10, 20, 30));

//Q2

function stringOnly(...args) {
  return args.filter((arg) => typeof arg === "string");
}

console.log(stringOnly(1, "hello", true, "world", 50));

//Q3
function squareNumbers(...args) {
  return args.map((num) => num * num);
}

console.log(squareNumbers(2, 3, 4));

//Q4
function getEvenNumbers(...args) {
  return args.filter((num) => num % 2 === 0);
}

console.log(getEvenNumbers(1, 2, 3, 4, 5, 6));

//Q5
function collectNames(...args) {
  return args.map((name) => name.toUpperCase());
}

console.log(collectNames("sid", "raj"));

//Q6
function makeUser(name, age, city) {
  return [{ name, age, city }];
}

console.log(makeUser("Sid", 22, "Delhi"));

//Q7
function addTen(...args) {
  return args.map((num) => num + 10);
}

console.log(addTen(5, 15, 25));

//Q8
function createFruitArray(...args) {
  if (args.length === 0) {
    return ["apple", "banana"];
  }
  return args;
}

console.log(createFruitArray());
console.log(createFruitArray("mango", "orange"));
