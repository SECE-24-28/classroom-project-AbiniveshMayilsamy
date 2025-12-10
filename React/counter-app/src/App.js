import "./App.css";
import { useEffect, useState } from "react";
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
  // sideEffects
  // call back function / array of dependencies{Propa/state}
  // usecases- empty array-> runs afte55r initial render
  // with dependices- run after every render if dependices changes
  //Without array of dependices
  useEffect(() => {
    console.log("useEffect called - Run once after initial render");
  }, []);

  useEffect(() => {
    console.log("useEffect called -  with dependices");
  }, [val]);

  useEffect(() => {
    console.log("useEffect called - without array");
  });

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
