import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Common/Header.js";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Quiz.json");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Outlet context={{ data }} />
    </div>
  );
}

export default App;
