import React from 'react';
import CalendarIcon from './svg/CalendarIcon';
function DateDropDown({selectedDate,handleDateChange}) {
  
  return (
    <div className='dropdown-button'>
      <div className='dropdown-button-n'>
        
          <div style={{width: "80%"}} >Traval Date</div> 
          <div className='dropdown-button-logo'>
           <CalendarIcon />
          </div>
       
        </div>  
        <input type="date"
        id="dateInput"
        name="dateInput"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
    
  );
}

export default DateDropDown;
