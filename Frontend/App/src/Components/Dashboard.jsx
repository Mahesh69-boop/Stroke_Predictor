import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ risk,chance}) => {
  const navigate = useNavigate();

  // Calculate risk percentage

  return (
    <div>
      <p>Risk of Heart Stroke: {risk}%</p>
      <p>Risk of getting an heart Stroke:{chance===1 ? "High" : "Low"}</p>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default Dashboard;
