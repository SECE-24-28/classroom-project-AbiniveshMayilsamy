//all corected code
let form = document.querySelector("form");
let name = document.querySelector("#name");
let course = document.querySelector("#course");
let rating = document.querySelector("#rating");
let feedback = document.querySelector("#feedback");
let result = document.querySelector("#output");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (name.value === "") {
    alert("Name field is required");
    return;
  }
  if (feedback.value.length < 5) {
    alert("Feedback must be at least 5 characters long");
    return;
  }
  result.innerHTML += `<div class="q"><h3 class="aa">Thank you, ${name.value}, for your feedback!</h3>
  <p class="bb">Your feedback: ${feedback.value}</p></div>`;
  form.reset();
});
