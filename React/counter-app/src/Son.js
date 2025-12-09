import GrandSon from "./GrandSon";
const Son = ({ msg }) => {
  return (
    <div className="S">
      <h2>Son</h2>
      {msg}
      <GrandSon msg={msg}></GrandSon>
    </div>
  );
};

export default Son;
