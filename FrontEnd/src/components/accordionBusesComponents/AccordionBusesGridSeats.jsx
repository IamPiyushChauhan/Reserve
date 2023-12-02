import React, { useEffect, useState } from 'react';
//background: isCLicked? "#1a52d6":"#fcffff"
function AccordionBusesGridSeats({seatClicked ,data}) {

      const handleClick = (item,isReseved) => {
        if(! isReseved){
          seatClicked(item)
        }else{
          console.log("is reseved got clicked")
        }
        
      };
      if(data){
        return (
          <div className="grid-container" style={{width: "90%"}}>
            {
              data.map((seat,index)=>(
                <div
                key={index}
                className={`grid-item ${index >= 14 && index <= 15 ? 'empty' : ''}`}
                onClick={() => handleClick((index + 1), seat.is_reseved)}
              > 
                <div className='parent-box' style={{background: seat.is_clicked? "#1a52d6":(seat.is_reseved)?"gray":"#fcffff"}}>
                   <div className='child-box' />
               </div>
              </div>
              ))
            }
          </div>
        );
      }else{
        return (<></>);
      }
      
}

export default AccordionBusesGridSeats;
