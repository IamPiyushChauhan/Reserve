import React from 'react';
import { useSelector } from 'react-redux';

function DataPage() {
  const { fromLocation,fromLocationState, toLocation,toLocationState, date,bus, seletedBusAndSeat } = useSelector((state) => state);
  return (
    <div>
       <div>
           <h2>Stored Information:</h2>
           <p>From Location: {fromLocation}</p>
           <p>From Location State: {fromLocationState}</p>
           <p>To Location: {toLocation}</p>
           <p>To Lacation State: {toLocationState}</p>
           <p>Date: {date}</p>
           <p>bus: {bus._id}</p>
           <p>seletedBusAndSeat {seletedBusAndSeat._id}</p>
      </div>
    </div>
  );
}

export default DataPage;
