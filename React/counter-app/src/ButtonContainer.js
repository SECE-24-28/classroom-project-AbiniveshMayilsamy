import Button from "./Button";

const ButtonContainer = ({ handleIncrement, handleDecrement }) => {
  return (
    <div className="Button">
      <Button className="inc" onClick={handleIncrement}>
        Increment
      </Button>
      <Button className="dec" onClick={handleDecrement}>
        Decrement
      </Button>
    </div>
  );
};

export default ButtonContainer;
