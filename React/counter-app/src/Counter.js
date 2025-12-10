import ButtonContainer from "./ButtonContainer";

const Counter = ({ val, handleIncrement, handleDecrement }) => {
  let v = null;
  if (val < 0) {
    v = <p>Negative Value</p>;
  } else if (val > 5) {
    v = <p>Positive Value</p>;
  }
  return (
    <div className="Counter">
      <h1>Counter</h1>
      <h1>{val}</h1>
      <p
        style={{
          border: "1px solid red",
          color: "red",
          fontSize: "13px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      {v}
      {/* {val < 0 ? (
        <h1
          style={{
            border: "1px solid red",
            color: "red",
            fontSize: "13px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Negative Value
        </h1>
      ) : null} */}
      <ButtonContainer
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </div>
  );
};

export default Counter;
