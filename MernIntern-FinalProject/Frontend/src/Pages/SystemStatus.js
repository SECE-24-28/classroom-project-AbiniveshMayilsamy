import { useState, useEffect } from "react";
import { statusAPI } from "../api";
import "../Styles/SystemStatus.css";

function SystemStatus() {
  const [status, setStatus] = useState({
    backend: { connected: false, message: "" },
    database: { connected: false, message: "" }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      setLoading(true);
      const data = await statusAPI.getStatus();
      setStatus(data || {
        backend: { connected: false, message: "Failed to connect" },
        database: { connected: false, message: "Failed to connect" }
      });
      setLoading(false);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-container">
      <h2>System Status</h2>
      
      <div className="status-grid">
        <div className={`status-card ${status.backend?.connected ? "connected" : "disconnected"}`}>
          <div className="status-icon">
            <span className={`dot ${status.backend?.connected ? "active" : ""}`}></span>
          </div>
          <h3>Backend Server</h3>
          <p className="status-message">{status.backend?.message || "Checking..."}</p>
          <p className="status-url">http://localhost:5000</p>
        </div>

        <div className={`status-card ${status.database?.connected ? "connected" : "disconnected"}`}>
          <div className="status-icon">
            <span className={`dot ${status.database?.connected ? "active" : ""}`}></span>
          </div>
          <h3>Database</h3>
          <p className="status-message">{status.database?.message || "Checking..."}</p>
          <p className="status-url">Local Storage</p>
        </div>
      </div>

      {loading && <p className="loading">Checking status...</p>}
      <p className="refresh-info">Status updates every 5 seconds</p>
    </div>
  );
}

export default SystemStatus;
