import React from 'react';

function DropDownListItem({item, itemClicked}) {
  return (
    <div className='dropdown-item' onClick={()=>{itemClicked(item)}}>
         {
            (item!== undefined)? <>
                     <p className='city'>{item.city} </p>
                     <p className='state'> {item.state}</p>
                    </>
                    :
                    <></>
         }
    </div>
  );
}

export default DropDownListItem;
