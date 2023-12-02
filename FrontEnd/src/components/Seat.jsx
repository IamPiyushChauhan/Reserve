import React, { useState } from 'react';

function Seat() {
  const[isClicked,setIsClicked]=useState(false)
  function onClick(){
    setIsClicked(!isClicked)
  }
  return (
    <div className='parentbox' style={{backgroundColor: (isClicked)?"#1a52d6": "white"}} onClick={onClick}>
      <div className='childBox'></div>
    </div>
  );
}

export default Seat;
