  import React from 'react'
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Home from "./Pages/Home";
  import Symptomspage from "./Pages/Symptomspage";
  import Dashboardpage from './Pages/DashBoardpage';
  import Signup from "./Pages/Signup";
  import Login from "./Pages/Login";
  import PreviousPred from "./Pages/PreviousPred";
  import "./App.css";
  import PrivateRoute from "./Components/PrivateRoute";

  const App = () => {
    return (
      <div id='Main'>
      <Routes> 
        <Route path="/Login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Home />} />
        
        <Route path="/symptoms" element={
          <PrivateRoute>
            <Symptomspage />
          </PrivateRoute>
          } />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboardpage />
          </PrivateRoute>
          } />
          <Route path="/history" element={
          <PrivateRoute>
            <PreviousPred />
          </PrivateRoute>
          } />
      </Routes>

      </div>
  
      
     
  );
  
};
  
  export default App ; 


  