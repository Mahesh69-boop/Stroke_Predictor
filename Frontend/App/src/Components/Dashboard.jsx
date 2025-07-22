import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashBoard.css'

const Dashboard = ({ risk,chance}) => {
  const navigate = useNavigate();

  // Calculate risk percentage
  const riskClass = chance === 1 ? 'high-risk' : 'low-risk';
  return (
    <div className="dashboard-container">
      <div className={`risk-box ${riskClass}`}>
       <p>Risk of Heart Stroke: {risk}%</p>
      </div>
      <div className={`risk-box ${riskClass}`}> 
       <p>Risk of getting an heart Stroke:{chance===1 ? "High" : "Low"}</p>
      </div>
      <button onClick={() => navigate('/history')}>Go Back</button>
    </div>
  );
};

export default Dashboard;
