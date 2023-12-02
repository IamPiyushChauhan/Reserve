import React from 'react';
import DownArrowIcon from '../svg/DownArrowIcon';


function LoactionButton({n,city, state,handleClick}) {

    
  return (
    <div className='dropdown-button'style={{height: "100%"}} onClick={handleClick}>
        <div className='dropdown-button-n'>
          <div>{n}</div> 
          <div className='dropdown-button-logo'>
            <DownArrowIcon />
          </div>
        </div>
        {
            (city=="" || city==undefined) ? <></> 
                                           : 
                                           <>
                                             <div className='dropdown-button-city'>{city}, {state}</div>
                                             <div className='dropdown-button-india'>India</div>
                                           </>
        }
    </div>
    
  );
}

export default LoactionButton;
