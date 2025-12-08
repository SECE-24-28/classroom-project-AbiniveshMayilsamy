function changeText() {
  const textElement = document.getElementById("text");

  if (textElement.textContent === "Text 1") {
    textElement.textContent = "Text 2";
  } else {
    textElement.textContent = "Text 1";
  }
}
let changeColor = () => {
  let c = document.querySelector("#box");
  c.classList.toggle("b");
  box.style.backgroundColor = "yellow";
  box;
};
function hideBox() {
  const box = document.getElementById("box");
  box.style.display = "none";
}

function showBox() {
  const box = document.getElementById("box");
  box.style.display = "flex";
}

function addItem() {
  const input = document.getElementById("itemInput");
  const list = document.getElementById("list");
  const itemText = input.value.trim();
  if (itemText) {
    const newItem = document.createElement("li");
    newItem.textContent = itemText;
    list.appendChild(newItem);
    input.value = "";
  } else {
    input.style.border = "2px solid red";
    setTimeout(() => {
      input.style.border = "1px solid #345475ff";
    }, 1000);
  }
}
