import { NavLink } from "react-router-dom";
import "../Styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <NavLink className="home-link" to="/register-hook">
        Go to Registration Using Hook Page
      </NavLink>

      <NavLink className="home-link" to="/register-no-hook">
        Go to Registration Without Hook Page
      </NavLink>

      <NavLink className="home-link" to="/login">
        Go to Login Page
      </NavLink>

      <NavLink className="home-link" to="/product">
        Go to Product Page
      </NavLink>
    </div>
  );
};

export default Home;
