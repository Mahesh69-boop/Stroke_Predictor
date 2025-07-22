import Dashboard from "../Components/Dashboard"; 
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import {useLocation} from "react-router-dom";


function Dashboardpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const prediction = location.state?.PredictionRes;


  // Extract the data
  const { risk_percentage, at_risk } = prediction;;

    return (
      <div>
        <h2  style={{ textAlign: "center", marginTop: "20px" }}>Your Stroke Risk Report</h2>
        <Dashboard risk={risk_percentage} chance={ at_risk}/>
      </div>
    );
}

export default Dashboardpage;

  