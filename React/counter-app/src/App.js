import "./App.css";
import { Component1 } from "./Component1";
import Component2, { Component, Component3 } from "./Component2";
import Component4 from "./Component4";
import Component5 from "./Component5";
import NamedComponent, {
  NamedComponent2,
  NamedComponent3,
} from "./NamedComponent";

function App() {
  let msg = "Hello World";
  return (
    <div className="App">
      <h1>Learning React</h1>
      <Component1 age={21}></Component1>
      <Component2></Component2>
      <Component></Component>
      <Component3></Component3>
      <Component4 src={msg}></Component4>
      <Component5></Component5>
      <NamedComponent></NamedComponent>
      <NamedComponent2></NamedComponent2>
      <NamedComponent3></NamedComponent3>
    </div>
  );
}

export default App;
