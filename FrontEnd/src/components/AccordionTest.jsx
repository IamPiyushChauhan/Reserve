// Accordion.js
import React, { useState } from 'react';
import BusGrid from './BusGrid';


const AccordionTest = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const renderedItems = items.map((item, index) => {
    const isActive = index === activeIndex;
    const contentClassName = `content ${isActive ? 'active' : ''}`;

    return (
      <div className='accordion-child' key={index}>
        <div className="title" onClick={() => onTitleClick(index)}>
          <i className={`icon ${isActive ? 'minus' : 'plus'}`}></i>
          {item.title}
           
        </div>
        <div className={contentClassName}>
              <BusGrid />
           </div>
       
      </div>
    );
  });

  return <div className="accordion">{renderedItems}</div>;
};

export default AccordionTest;
