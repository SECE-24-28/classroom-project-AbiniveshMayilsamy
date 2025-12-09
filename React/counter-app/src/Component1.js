export const Component1 = (props) => {
  return (
    <div style={{ backgroundColor: "red" }}>
      <h1>Component1</h1>
      <h1>{props.age}</h1>
    </div>
  );
};
