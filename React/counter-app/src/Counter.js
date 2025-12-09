import ButtonContainer from "./ButtonContainer";

const Counter = ({ val, handleIncrement, handleDecrement }) => {
  return (
    <div className="Counter">
      <h1>Counter</h1>
      <h1>{val}</h1>
      {val < 0 ? (
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
      ) : null}
      <ButtonContainer
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
      />
    </div>
  );
};

export default Counter;
