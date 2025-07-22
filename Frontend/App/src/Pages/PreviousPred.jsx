
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useAxios from "../assets/AxiosInterceptor";
import "./PreviousPrediction.css";

export default function PredictionHistory() {
  const { token } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axiosInstance.get(`${URL}/api/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("History API response:", res.data);

        setPredictions(res.data);
      } catch (err) {
        console.error("Error fetching predictions", err);
      }
    };
    fetchHistory();
  }, [token]);

  return (
    <div className="history-container">
      <h2>Your Previous Predictions</h2>
  
      {predictions.length === 0 ? (
        <p style={{ marginTop: "20px", color: "#333", fontSize: "1.1rem" }}>
          No previous prediction, I guess you're a new user 🧐
        </p>
      ) : (
        <div className="history-scroll-box">
          {predictions.map((p, idx) => (
            <div className={`history-card ${p.result?.at_risk === 1 ? 'high-risk' : 'low-risk'}`} key={idx}>
              <h4>Prediction #{idx + 1}</h4>
              <p><strong>Symptoms:</strong> {Object.keys(p.inputData).filter(key => p.inputData[key] === 1).join(", ") || "None"}</p>
              <p><strong>Risk:</strong> {p.result?.risk_percentage}%</p>
              <p><strong>At Risk:</strong> {p.result?.at_risk === 1 ? "Yes" : "No"}</p>
              <small>{new Date(p.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
  
      <button className="new-session-btn" onClick={() => navigate("/symptoms")}>
        Start New Session
      </button>
    </div>
  );
  
  
}
