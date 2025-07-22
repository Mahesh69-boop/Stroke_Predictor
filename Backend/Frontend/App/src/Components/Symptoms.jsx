import React from 'react'
import './Symptom.css'
const Symptoms = (props) => {
  return (
    <div id='Symptom'>
      <div id='des'>
      <label >{props.symptom}</label>
      <p>{props.Description}</p>
      </div>
      <input type="checkbox"
         checked={props.isChecked===1}
         onChange={props.onCheckboxChange}  />
    </div>
  )
}

export default Symptoms;