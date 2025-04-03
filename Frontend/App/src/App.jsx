  import React from 'react'
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Home from "./Pages/Home";
  import Symptomspage from "./Pages/Symptomspage";
  import Dashboardpage from './Pages/DashBoardpage';
  import "./App.css";
  const App = () => {
    return (
      <div id='Main'>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/symptoms" element={<Symptomspage />} />
        <Route path="/dashboard" element={<Dashboardpage />} />
      </Routes>

      </div>
      
     
  )
  
};
  
  export default App