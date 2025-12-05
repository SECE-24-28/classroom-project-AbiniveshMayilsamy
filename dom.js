// //1 Tag Selector
// let a = document.getElementsByTagName("h1");
// console.log(a);

// //2. class Selector
// let cl = document.getElementsByClassName("a");
// console.log(cl);

// //3. ID Selector
// let id = document.getElementById("b");
// console.log(id);

// //4.Query Selector
// let q = document.querySelector("h1");
// // it will return single
// console.log(q);

// //5. Query Selector all
// let q1 = document.querySelectorAll("#name");
// console.log(q1);

//    <-----------READ AND WRITE OPERATION--------------------->

let head = document.querySelector("p");
// Read OPeration
console.log(head.textContent);

// Write Operation
head.textContent = "This is new Para text content.";
console.log(head.textContent);

let div = document.querySelector("div");
div.innerHTML = "<h1> Hello From Para </h1>";
//div.textContent = "<h1> Hello From Para </h1>";
console.log(div.textContent);
console.log(div.innerHTML);
