import React from 'react';
import DropDownListItem from './DropDownListItem';




function DropDownList({cityList , handleClick}) {
  return (
    <div >
      { cityList.map((info,index)=><DropDownListItem key={index} item={info} itemClicked={handleClick}/>)}
    </div>
  );
}

export default DropDownList;
