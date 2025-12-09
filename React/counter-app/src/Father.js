import Son from "./Son";
const Father = ({ msg }) => {
  return (
    <div className="f">
      <h2>Father</h2>
      {msg}
      <Son msg={msg}></Son>
    </div>
  );
};

export default Father;
