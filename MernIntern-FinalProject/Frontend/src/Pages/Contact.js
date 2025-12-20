import { useNavigate } from "react-router-dom";
import "../Styles/Contact.css";

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with us</p>
      </div>

      <div className="contact-content">
        <div className="contact-card">
          <h2>Location</h2>
          <p>Sri Eswar College of Engineering</p>
          <p>Coimbatore</p>
          <p>Department of Computer Science and Engineering</p>
        </div>

        <div className="contact-card">
          <h2>Follow Us</h2>
          <p>
            Instagram:{" "}
            <a
              href="https://instagram.com/srieshwarcbe"
              target="_blank"
              rel="noopener noreferrer"
            >
              @srieshwarcbe
            </a>
          </p>
        </div>

        <div className="contact-card">
          <h2>About</h2>
          <p>Quiz Portal - Test Your Knowledge</p>
          <p>A comprehensive platform for online assessments and learning.</p>
        </div>
      </div>
      <img
        src="/multi quiz portal.png"
        alt="Quiz Portal Logo"
        className="contact-logo"
      />

      <button onClick={() => navigate("/quiz")} className="back-to-home">
        Back to Home
      </button>
    </div>
  );
}

export default Contact;
