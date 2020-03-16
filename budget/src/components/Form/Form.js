import React from "react";
import "./form.css";

function Form() {
  return (
    <div className='form'>
      <div className='add__container'>
        <select className='add__type'>
          <option value='inc'>+</option>
          <option value='exp'>-</option>
        </select>
        <input
          type='text'
          className='add__description'
          placeholder='Add description'
        />
        <input type='number' className='add__value' placeholder='Value' />
        <button type='button' className='add__btn' id='add__btn'>
          <i className='ion-ios-checkmark-outline'></i>
        </button>
      </div>
    </div>
  );
}

export default Form;
