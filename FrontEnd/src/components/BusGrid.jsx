import React from 'react';


function BusGrid() {
    const handleClick = (item) => {
        alert(`Clicked on item: ${item}`);
        // Add your custom click event handling logic here
      };
    
      return (
        <div className="grid-container">
          {[...Array(21).keys()].map((index) => (
            <div
              key={index}
              className={`grid-item ${index >= 14 && index <= 15 ? 'empty' : ''}`}
              onClick={() => handleClick(index + 1)}
            > 
              <div className='parent-box'>
                 <div className='child-box' />
             </div>
            </div>
          ))}
        </div>
      );
}

export default BusGrid;
