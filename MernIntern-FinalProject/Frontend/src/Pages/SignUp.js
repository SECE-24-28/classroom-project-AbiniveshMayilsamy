import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/SignUp.css";

function SignUp() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleNext() {
    setError("");
    if (step === 1) {
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!email.trim()) {
        setError("Please enter your email");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email");
        return;
      }
      setStep(3);
    }
  }

  function handleBack() {
    setError("");
    setStep(step - 1);
  }

  function handleSignUp(e) {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      
      if (users.find(u => u.email === email)) {
        setError("Email already registered");
        setLoading(false);
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      
      localStorage.setItem("userRole", "student");
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("loginTime", new Date().toISOString());
      
      navigate("/quiz");
    }, 500);
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-logo-section">
        <img src="/multi quiz portal.png" alt="Quiz Portal Logo" className="signup-logo-img" />
        <div className="signup-logo-text">
          <h2>Quiz Portal</h2>
          <p>Test Your Knowledge</p>
        </div>
      </div>

      <div className="signup-container">
        <div className="signup-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Name</p>
          </div>
          <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Email</p>
          </div>
          <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Password</p>
          </div>
        </div>

        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Step {step} of 3</p>
        </div>

        <form onSubmit={step === 3 ? handleSignUp : (e) => { e.preventDefault(); handleNext(); }}>
          {step === 1 && (
            <div className="form-group slide-in">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="signup-input"
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div className="form-group slide-in">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="signup-input"
                autoFocus
              />
            </div>
          )}

          {step === 3 && (
            <>
              <div className="form-group slide-in">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="signup-input"
                  autoFocus
                />
              </div>

              <div className="form-group slide-in">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="signup-input"
                />
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <div className="signup-actions">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="back-btn">
                Back
              </button>
            )}
            <button type="submit" className="next-btn" disabled={loading}>
              {loading ? "Processing..." : step === 3 ? "Create Account" : "Next"}
            </button>
          </div>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <a href="/">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
