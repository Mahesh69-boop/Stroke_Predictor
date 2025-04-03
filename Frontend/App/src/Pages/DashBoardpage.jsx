import Dashboard from "../Components/Dashboard"; 
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";


function Dashboardpage() {
  const navigate = useNavigate();
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    // Retrieve and parse the prediction data from localStorage
    const data = JSON.parse(localStorage.getItem('prediction'));
    
    if (data) {
      setPredictionData(data);  // Store the data in state for rendering
    } else {
      console.log('No prediction data found in localStorage');
      // Optionally navigate back to the Symptomspage if no data is found
      navigate("/symptoms");
    }
  }, [navigate]);

  if (!predictionData) {
    return <div>Loading...</div>;  // You can show a loading indicator until the data is retrieved
  }

  // Extract the data
  const { risk_percentage, at_risk } = predictionData;

    return (
      <div>
        <h2>Your Stroke Risk Report</h2>
        <Dashboard risk={risk_percentage} chance={ at_risk}/>
      </div>
    );
}

export default Dashboardpage;

  