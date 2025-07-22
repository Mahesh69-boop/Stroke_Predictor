import React from 'react'
import './Symptom.css'
const Symptoms = (props) => {
  return (
    <div className='symptom'>
      <input
        type="checkbox"
        checked={props.isChecked === 1}
        onChange={props.onCheckboxChange}
        id={`chk-${props.symptom}`} 
      />
      <div className='desc'>
        <label htmlFor={`chk-${props.symptom}`}>{props.symptom}</label>
        <p>{props.Description}</p>
      </div>
    </div>
  );
}

export default Symptoms;