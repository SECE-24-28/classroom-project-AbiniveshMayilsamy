// // // // //1 Tag Selector
// // // // let a = document.getElementsByTagName("h1");
// // // // console.log(a);

// // // // //2. class Selector
// // // // let cl = document.getElementsByClassName("a");
// // // // console.log(cl);

// // // // //3. ID Selector
// // // // let id = document.getElementById("b");
// // // // console.log(id);

// // // // //4.Query Selector
// // // // let q = document.querySelector("h1");
// // // // // it will return single
// // // // console.log(q);

// // // // //5. Query Selector all
// // // // let q1 = document.querySelectorAll("#name");
// // // // console.log(q1);

// // // //    <-----------READ AND WRITE OPERATION--------------------->

// // // let head = document.querySelector("p");
// // // // Read OPeration
// // // console.log(head.textContent);

// // // // Write Operation
// // // head.textContent = "This is new Para text content.";
// // // console.log(head.textContent);

// // // let div = document.querySelector("div");
// // // div.innerHTML = "<h1> Hello From Para </h1>";
// // // //div.textContent = "<h1> Hello From Para </h1>";
// // // console.log(div.textContent);
// // // console.log(div.innerHTML);

// // // let div1 = document.querySelector("div");
// // // div1.innerHTML = "<h1> hello from inner Html</h1>";

// // // // add/ remove/ toggle class
// // // let head = document.querySelector("h1");
// // // console.log(head);

// // // head.classList.add("color");
// // // head.classList.remove("background");
// // // head.classList.toggle("color");
// // // head.classList.toggle("border");

// // // // Styling
// // // let p = document.querySelector("p");
// // // p.style.color = "green";
// // // p.style.backgroundColor = "Skyblue";
// // // p.style.fontSize = "20px";
// // // p.style.fontFamily = "Arial";

// // // create Html Elements

// // // 1.Parent element
// // let ul = document.createElement("ul");
// // // 2.chid element
// // let li = document.createElement("li");
// // //3.content
// // li.textContent = "Item 1";
// // //4.append child
// // ul.appendChild(li);
// // document.body.appendChild(ul);

// // document.body.appendChild(ul);
// // let arr = ["apple", "Mango", "Banana"];
// // arr.forEach((element) => {
// //   let lo = document.createElement("li");
// //   lo.textContent = element;
// //   ul.appendChild(lo);
// // });

// let form = document.querySelector("form");
// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   let name = document.querySelectorAll("input")[0];
//   let feedback = document.querySelectorAll("input")[1];
//   if (name.value === "") {
//     alert("Please enter your name");
//     return;
//   }
//   if (feedback.value.length < 5) {
//     alert("Please enter your feedback more than 5 letters");
//     return;
//   }

//   let result = document.createElement("result");
//   result.textContent = `Thankyou ${name} for feedback ${feedback}!`;
//   form.reset();
// });

var aw = {
  name: "Amrit",
  b: 20,
};

console.log(this);
var funf = function (aa, jk) {
  console.log(this.name, aa, jk);
};

let boundedfn = funf.bind(obj, 500, "kl");
boundedfn();
funf.call(obj, 400, 900);

funf.call(obj, 400, 900);
funf.apply(obj, [400, 900]);
