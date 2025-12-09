import "./App.css";
import { useState } from "react";
import Counter from "./Counter";
// import { Component1 } from "./Component1";
// import Component2, { Component, Component3 } from "./Component2";
// import Component4 from "./Component4";
// import Component5 from "./Component5";
// import NamedComponent, {
//   NamedComponent2,
//   NamedComponent3,
// } from "./NamedComponent";
// import GrandFather from "./GrandFather";

function App() {
  // let val = 0;
  let [val, setVal] = useState(10);
  const handleIncrement = () => {
    // val = val + 1;
    setVal(val + 1);
    console.log("Increment Button Clickeed", val);
  };
  const handleDecrement = () => {
    // val = val - 1;
    setVal(val - 1);
    console.log("Decrement Button Clickeed", val);
  };
  return (
    <div className="App">
      <h1>Learning React</h1>
      <Counter
        val={val}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </div>
  );
}

export default App;
