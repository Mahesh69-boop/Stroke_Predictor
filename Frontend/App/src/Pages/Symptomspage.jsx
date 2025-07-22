import { Link, useNavigate } from "react-router-dom";
import Symptoms from "../Components/Symptoms";
import React, { useState } from "react";
import useAxios from "../assets/AxiosInterceptor";
import "./Symptomspage.css";
import { useAuth } from "../context/AuthContext";


function Symptomspage() {
    const navigate = useNavigate();
    const [symptomsState, setSymptomsState] = useState({
        chestPain: 0,
        shortnessOfBreath: 0,
        irregularHeartbeat: 0,
        fatigue: 0,
        dizziness: 0,
        swelling: 0,
        painInNeck: 0,
        excessiveSweating: 0,
        persistentCough: 0,
        nausea: 0,
        highBloodPressure: 0,
        chestDiscomfort: 0,
        coldHandsFeet: 0,
        snoring: 0,
        anxiety: 0,
        Age:0
      });
      const { user, token } = useAuth();
      const axios = useAxios(); 
      const URL = import.meta.env.VITE_API_BASE_URL;
      const handleCheckboxChange = (symptom) => {
        setSymptomsState((prevState) => ({
          ...prevState,
          [symptom]: prevState[symptom] === 0 ? 1 : 0,  // Toggle between 1 and 0
        }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
          const response = await axios.post(`${URL}/predict`, JSON.stringify(symptomsState),
        {
          headers:{
            "Content-Type" : "application/json"
          }
        });

        const PredictionRes = response.data;
        console.log({
          userId: user?.email,
          inputData: symptomsState,
          result: PredictionRes,
        })
        await axios.post("/api/save",{
          userId: user?.email,
          inputData: symptomsState,
          result: PredictionRes,
        })
          
    
          // Navigate to the dashboard
          navigate("/dashboard",{state:{PredictionRes}});
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const onchange= (Val) =>{
        setSymptomsState((prevState) =>(
          {
          ...prevState,
          Age: Val.target.value
          }
        ));
      }



  return (
    <div id="dv">
      <h2>Select Your Symptoms</h2>
      <Symptoms symptom="Chest Pain" Description="Do you sometimes or regularly feel pain or discomfort in your chest? 
     This can range from mild discomfort to a sharp or intense pain. If yes? Tick the box"
     isChecked={symptomsState.chestPain}
     onCheckboxChange={() => handleCheckboxChange("chestPain")}
     />
     <Symptoms symptom="Shortness of breadth" Description="Do you sometimes or regularly experience difficulty 
     breathing or feel like you can’t catch your breath? If yes, Tick the box"
     isChecked={symptomsState.shortnessOfBreath}
     onCheckboxChange={() => handleCheckboxChange("shortnessOfBreath")}
     />
     <Symptoms symptom="Irregular heartbeat" Description="Do you ever feel like your heart is beating too fast, too slow, or skipping beats?
        If yes? Tick the box"
        isChecked={symptomsState.irregularHeartbeat}
        onCheckboxChange={() => handleCheckboxChange("irregularHeartbeat")}
        />
     <Symptoms symptom="Fatigue and weakness" Description="Do you often feel tired, weak, or drained even after a full night's sleep 
     or even if you haven't done such hard workout or Outdoor activities, If yes? tick the box"
     isChecked={symptomsState.fatigue}
     onCheckboxChange={() => handleCheckboxChange("fatigue")}
     />
     <Symptoms symptom="Dizziness"  Description="Do you experience feelings of lightheadedness or dizziness, as if you might faint or lose balance?
        If yes? Tick the box"
        isChecked={symptomsState.dizziness}
        onCheckboxChange={() => handleCheckboxChange("dizziness")}
        />
     <Symptoms symptom="Swelling"  Description="Have you noticed swelling in your ankles, legs, or abdomen? Swelling, especially in the lower extremities,
        If yes? tick the box"
        isChecked={symptomsState.swelling}
        onCheckboxChange={() => handleCheckboxChange("swelling")}
        />
     <Symptoms symptom="Pain in neck/Jaw/shoulder/back"  Description="Do you sometimes or regularly experience pain or discomfort in your neck, jaw, shoulder, or back?
       if yes? tick the box"
       isChecked={symptomsState.painInNeck}
       onCheckboxChange={() => handleCheckboxChange("painInNeck")}
       />
     <Symptoms symptom="Excessive sweating"  Description="Do you experience excessive sweating, when not even  engaging in physical activity?
        if yes? Tick the box "
        isChecked={symptomsState.excessiveSweating}
        onCheckboxChange={() => handleCheckboxChange("excessiveSweating")}
        />
     <Symptoms symptom="Presistant cough"  Description="Do you have a persistent cough that doesn't seem to go away?
        if Yes? Tick the box"
        isChecked={symptomsState.persistentCough}
        onCheckboxChange={() => handleCheckboxChange("persistentCough")}
        />
     <Symptoms symptom="Nausea/vomoting"  Description="Do you feel nauseous or experience vomiting, especially with other symptoms like chest pain or shortness of breath?
        If Yes? Tick the box"
        isChecked={symptomsState.nausea}
        onCheckboxChange={() => handleCheckboxChange("nausea")}
        />
     <Symptoms symptom="High Blood Pressure"  Description="Do you have a history of high blood pressure or have you noticed an increase in your blood pressure?
     If yes? tick the box"
     isChecked={symptomsState.highBloodPressure}
     onCheckboxChange={() => handleCheckboxChange("highBloodPressure")}

     />
     <Symptoms symptom="Chest discomfort"  Description="Do you experience discomfort or pain in your chest? Chest discomfort can range from mild pressure to sharp pain.
        If yes? Tick the box"
        isChecked={symptomsState.chestDiscomfort}
        onCheckboxChange={() => handleCheckboxChange("chestDiscomfort")}
        />
     <Symptoms symptom="cold hands/feet"  Description="Do you often feel that your hands and feet are cold, even in warm temperatures?
       If yes? tick the box"
       isChecked={symptomsState.coldHandsFeet}
       onCheckboxChange={() => handleCheckboxChange("coldHandsFeet")}

       />
     <Symptoms symptom="Snoring/Sleep Apnea"  Description="Do you snore loudly or experience difficulty breathing while sleeping?
       If yes? tick the box"
       isChecked={symptomsState.snoring}
       onCheckboxChange={() => handleCheckboxChange("snoring")}
       />
     <Symptoms symptom="Anxiety/ Feeling of Doma"  Description="Do you often experience feelings of anxiety or a sense of impending doom?
       If yes? tick the Box"
       isChecked={symptomsState.anxiety}
       onCheckboxChange={() => handleCheckboxChange("anxiety")}
      />
      <input type="number" id="Input" placeholder="Enter Your Age" onChange={onchange}/>
        <button onClick={handleSubmit}>Submit</button>
      
    </div>
  );
}

export default Symptomspage;
