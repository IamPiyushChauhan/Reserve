import React,{useEffect,useState, useReducer} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import AccordionBuses from '../components/AccordionBuses';
import { setBus, setSelectedBusAndItSeats } from '../service/action/ReserveAction';
import { useNavigate } from 'react-router-dom';

const seletedBusAndSeatReducer = (state,{type,busIndexNo,busSeatIndex,busSeatData,payLoad})=>{

  switch(type){
    case "ADD_IDS_DATA":
      return payLoad
    
      case "ADD_SEAT_DATA":
      let seletedBusObj = state[busIndexNo]
      let seletedBusSeatArr = seletedBusObj.seleted_seats
      const seatNo = busSeatData.no
      
      const isAvableSeat = seletedBusSeatArr.some(seat => seat.no === seatNo)
      console.log(isAvableSeat)
      if(isAvableSeat){
        
      }else{
        seletedBusSeatArr.push(busSeatData)
        console.log(seletedBusSeatArr)
      }
      seletedBusObj = {...seletedBusObj,seleted_seats: seletedBusSeatArr}
      return [...(state.map((b,i)=>{return (busIndexNo===i)? seletedBusObj: b}))]
     
      
      case "DELETE_SEAT_DATA":
        let seletedBusObj2 = state[busIndexNo]
        let seletedBusSeatArr2 = seletedBusObj2.seleted_seats
       
        const seatNo2 = busSeatData.no
      
        const isAvableSeat2 = seletedBusSeatArr2.some(seat => seat.no === seatNo2)
        console.log(isAvableSeat2)
        if(isAvableSeat2){
          
          const indexOfNo1 = seletedBusSeatArr2.findIndex(seat => seat.no === seatNo2);

          // If index is found, remove the object
          if (indexOfNo1 !== -1) {          
            seletedBusSeatArr2.splice(indexOfNo1, 1);
          }else {
              console.log("Else CALLED")
          }

        }
        seletedBusObj2 = {...seletedBusObj2,seleted_seats: seletedBusSeatArr2}
        return [...(state.map((b,i)=>{return (busIndexNo===i)? seletedBusObj2: b}))]
        

  }
}

const busesReducer = (state,{type,busIndexNo,busSeatIndex,payLoad}) =>{
  switch(type){
    case "ADD_BUS_DATA":
      return payLoad

      case "UDATE_SEAT":
        let busObj = state[busIndexNo]
        let busSeatObj = busObj.seats_details[busSeatIndex]
        busSeatObj = {...busSeatObj, is_clicked: !busSeatObj.is_clicked}
        let seatArr = busObj.seats_details
        seatArr = [...(seatArr.map((s,i)=>{return (busSeatIndex===i)? busSeatObj: s}))]
        busObj = {...busObj,seats_details: seatArr}
        return [...(state.map((b,i)=>{return (busIndexNo===i)? busObj: b}))]

      
    }
}

function BusesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [busesState, busesDispatch] = useReducer(busesReducer, []);
  const [seletedBusAndSeatState, seletedBusAndSeatDispatch] = useReducer(seletedBusAndSeatReducer, []);
  useEffect(()=>{
    const data = {
        "from": fromLocation,
        "fromState": fromLocationState,
        "to": toLocation,
        "toState": toLocationState,
        "date": date
        }
        async function apiCall(){
          await axios.get('https://reserve-backend-la7a.onrender.com/bus',{params: data})
          .then(response => {
            busesDispatch({type: "ADD_BUS_DATA",payLoad: response.data})
            let data = response.data
            data = data.map((x) => ({ _id: x._id,  seleted_seats: []}));
            seletedBusAndSeatDispatch({type: "ADD_IDS_DATA", payLoad: data})
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        }
        apiCall()
        
  },[])

  

  
  const { fromLocation,fromLocationState, toLocation,toLocationState, date } = useSelector((state) => state);
  
  
  


  const seletedAccdionItemAndSeat = (busArrayIndex,seatNo,isUpperBerth) =>{
    seatNo = (seatNo>16)? seatNo-2: seatNo
    seatNo = (isUpperBerth)? seatNo: seatNo+19
    busesDispatch({type: "UDATE_SEAT",busIndexNo: busArrayIndex,busSeatIndex: seatNo-1})
    let seatObj = busesState[busArrayIndex].seats_details[seatNo-1]
    if(seatObj.is_clicked){
      seletedBusAndSeatDispatch({type: "DELETE_SEAT_DATA",busIndexNo: busArrayIndex,busSeatIndex: seatNo,busSeatData: seatObj})
    }else{
      seletedBusAndSeatDispatch({type: "ADD_SEAT_DATA",busIndexNo: busArrayIndex,busSeatIndex: seatNo,busSeatData: seatObj})
    }
    
  }

  const proceed = (index) =>{
    dispatch(setSelectedBusAndItSeats(seletedBusAndSeatState[index])) 
    dispatch(setBus(busesState[index]))
    
    navigate('/book')
  }

  return (
    <div>
      <AccordionBuses buses={busesState} seletedBusAndSeat={seletedBusAndSeatState} clickedBusAndSeat={seletedAccdionItemAndSeat} proceedToBook={proceed}/>
    </div>
  );
}

export default BusesPage;
