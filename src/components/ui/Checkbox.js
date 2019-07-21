import React from "react"
import './checkbox.css';

const CheckBox = ({id}) => <div>
    <input type="checkbox" className="checkbox-input" id={id}></input>
    <label htmlFor={id} className="checkbox-label"></label>
</div>

export default CheckBox
