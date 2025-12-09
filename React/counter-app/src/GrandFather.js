import Father from "./Father";
let msg = "Hello World";
const GrandFather = (props) => {
  return (
    <div className="Gf">
      <h2>Grand Father</h2>
      {props.myWill}
      <Father msg={msg}></Father>
    </div>
  );
};

export default GrandFather;
