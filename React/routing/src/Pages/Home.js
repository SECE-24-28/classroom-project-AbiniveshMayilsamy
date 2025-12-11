import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { id } = useParams();
  const { data } = useOutletContext();
  console.log(data);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      {id && <h2>Page ID: {id}</h2>}
      {data && (
        <div>
          <h2>Quiz Data:</h2>
          <p
            style={{
              backgroundColor: "#f0f0f0",
              padding: "15px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
