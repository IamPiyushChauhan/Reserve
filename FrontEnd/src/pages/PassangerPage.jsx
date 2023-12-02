import React, { useEffect,useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const reducer = (state,{type, key,id,val,payLoad}) =>{
    switch(type){
        case "ADD_DATA":
            return payLoad
        
        case "UDATE_DATA":
            let obj = state[id];
            obj= {...obj, [key]: val}
            return [...(state.map((jobj,index)=>{ return (index===id)? obj: jobj}))];
    }
}


function PassangerPage() {
    
    const { bus, seletedBusAndSeat } = useSelector((state) => state);
    const [state,dispatch] = useReducer(reducer,[])
    const [price,setPrise] = useState(0)
    const [priceBefourTax, setPriceBefourTax] = useState(0)
    const [taxPrice,setTaxPrice] = useState(0)
    
    useEffect(()=>{
       let seats =  seletedBusAndSeat.seleted_seats
       console.log(seats)
       let arr = []
       let p = 0
       for(let i=0;i<seats.length;i++){
        let obj = seats[i]
        console.log(obj)
        if(i=== 0){
            arr.push({no: obj.no, type: obj.type,price: obj.price , name: "", gender: "", age: "",email: "", mobile: ""})
        }else{
            arr.push({no: obj.no, type: obj.type,price: obj.price , name: "", gender: "", age: ""})
        }
        p = p+obj.price
       }
       dispatch({type: "ADD_DATA" , payLoad: arr})
       setPriceBefourTax(p)
       let tp = p* (18/100)
       setTaxPrice(tp)
       let sum = tp+p
       setPrise(sum)
       
    },[])

    const isValidEmailFun = () =>{
     const p1 =  state[0]
     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     const isValidEmail = emailRegex.test(p1.email);
      return isValidEmail
    }

    const isValidPhoneNoFun = () =>{
      const p1 =  state[0]
      const tenDigitStartingWith6AndAboveRegex = /^[6-9]\d{9}$/;
      const isValidNumber = tenDigitStartingWith6AndAboveRegex.test(p1.mobile);
      return isValidNumber
    }

    const isAllPassangerValid = () =>{
      if(!isValidEmailFun()){
        toast.error('Please Enter Valid Phone No', {
          position: toast.POSITION.TOP_CENTER,
        });
        return false
      }
      if(!isValidPhoneNoFun()){
        toast.error('Please Enter Valid Phone No', {
          position: toast.POSITION.TOP_CENTER,
        });
        return false
      }
      console.log("***********************")
      console.log(state)
      for(let i=0;i<state.length;i++){
        let obj = state[i]
        console.log(obj)
        if(obj.name === "" || obj.gender === "" || obj.age === "" ){
          return false
        }
      }

      return true
    }

    const onClick = () =>
     {
      const uniqueId = uuidv4();
      const valid =  isAllPassangerValid()
      if(valid === false ){
        
        toast.error('Please Enter All Details', {
          position: toast.POSITION.TOP_CENTER,
        });
      }else{
        
        window.localStorage.setItem('ticket_id', uniqueId);
          const apiCall = async () =>{
                await axios.post("https://reserve-backend-la7a.onrender.com/bus/payment", {bus_and_seats: seletedBusAndSeat, passanger_details: state, ticket_id: uniqueId})
                 .then(response => {console.log(response.data)
                    if(response.data.url != undefined){
                        window.location.replace(response.data.url)
                    }else{
                      toast.warn('Faield To get Payment URL', {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    }
                    
                })
                  .catch(error => {
                       console.error('Error fetching data:', error);
                 });
            }
           apiCall()
      }
          
    }

    const calculateTimeDifference = (startTime, endTime) => {
      // Calculate the time difference in milliseconds
      const timeDifference = endTime - startTime;
  
      // Convert the time difference to seconds, minutes, and hours
      const seconds = Math.floor((timeDifference / 1000) % 60);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  
      // You can also calculate days if needed
      // const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
      return `${Math.abs(hours)} : ${Math.abs(minutes)}`;
    };

    

    const convertTimestampToDate = (timestamp) => {
      const months = {
        1: "JAN",
        2: "FEB",
        3: "MAR",
        4: "APR",
        5: "MAY",
        6: "JUN",
        7: "JUL",
        8: "AUG",
        9: "SEP",
        10: "OCT",
        11: "NOV",
        12: "DEC",
      };
  
      const date = new Date(timestamp);
  
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1; // Months are zero-based, so we add 1
  
      const formattedDate = `${day} ${months[month]}`;
  
      return formattedDate;
    };

    const convertTimestampToHourAndMinute = (timestamp) => {
      const date = new Date(timestamp);
  
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
  
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
  
      return formattedTime;
    };
//{display: 'flex', justifyContent: "space-between"}
  return (
    <div style={{paddingTop: "1em", height: "100vh", width: "100vw"}}>
      <div style={{display: 'flex', justifyContent: "space-evenly"}}>
        <div style={{width: "60%",height: "1000%"}}>
        <div className='BUS-DETAIL'>
        <div className="title">
          <div
            className="p"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.5em",
            }}
          >
            <div className="c1">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <h4>{bus.name} </h4>
                </div>
                <div
                  style={{
                    backgroundColor: "#9ADE7B",
                    width: "2em",
                    height: "2em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0.675em",
                    marginLeft: "0.5em",
                    marginRight: "0.5em",
                  }}
                >
                  {bus.rating}
                </div>
                <div>
                  <p
                    style={{
                      fontWeight: "200",
                      fontSize: "xx-small",
                      color: "gray",
                    }}
                  >
                    Rating
                  </p>
                </div>
              </div>
              <div>
                <p style={{ color: "#808080", fontSize: "medium" }}>
                  {bus.category} | {bus.totalSeats} total left |{" "}
                  {bus.totalWindowSeatsAvailable} window seat left
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div>
                  {`${convertTimestampToHourAndMinute(
                    bus.startTime - 19800000
                  )} , ${convertTimestampToDate(bus.date)}`}
                  </div>
                  <p
                  style={{
                    fontWeight: "200",
                    fontSize: "xx-small",
                    color: "#808080",
                    marginBottom: "1px",
                  }}ƒ
                  >{bus.from} , {bus.fromState}</p>
                  
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    color: "#808080",
                  }}
                >
                  ----- {calculateTimeDifference(bus.startTime, bus.endTime)}{" "}
                  -----
                </div>
                <div>
                <div>
                  {`${convertTimestampToHourAndMinute(
                    bus.endTime - 19800000
                  )} , ${convertTimestampToDate(bus.date)}`}
                </div>
                <p
                style={{
                  fontWeight: "200",
                  fontSize: "xx-small",
                  color: "#808080",
                  marginBottom: "1px",
                }}
                >{bus.to}, {bus.toState}</p>
                </div>
              </div>
              
            </div>
            
          </div>
        </div>
        </div>
        <div style={{height: "max-content"}}>
        
              {
                state.map(
            (passenger,index)=>{
                    return (
                      <div style={{width: "100%"}}>
                        <h4>Passanger {index+1} Seat No {passenger.no}</h4>
                        <div className='traveller-details' key={index} style={{margin: "1px", width: "80%", marginBottom: "5px",height: "20%"}}>
                            
                            <div className='essatial-info' >
                            <div className='input-p'>
                               <label>Name</label>
                               <input
                               type="text"
                               name="name"
                               value={passenger.name}
                               onChange={(e)=>{dispatch({type: "UDATE_DATA", key: "name",id: index,val : e.target.value})}}
                               />
                            </div>
                             
                            <div className='input-p'>
                                <label>Gender</label>
                                <select
                                  name="gender"
                                  value={passenger.gender}
                                  onChange={(e)=>{dispatch({type: "UDATE_DATA", key: "gender",id: index,val : e.target.value})}}
                                >
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                            </div>

                            <div className='input-p'>
                               <label>{"Age (in years)"}</label>
                               <input
                                 type="number"
                                 name="age"
                                 min="0"
                                 max="100"
                                 value={passenger.age}
                                 onChange={(e)=>{dispatch({type: "UDATE_DATA", key: "age",id: index,val : e.target.value})}}
                               />
                            </div>
                            </div>

                            {(index ==0)? <div className='essatial-info'>
                             <div className='input-p'>
                                <label>Email ID </label>
                                <input 
                                type='email'
                                 name='email'
                                 value={passenger.email}
                                 onChange={(e)=>{dispatch({type: "UDATE_DATA", key: "email",id: index,val : e.target.value})}}
                                />
                                
                             </div>

                             <div>
                                <label className='input-p'>Mobile NO </label>
                                <input 
                                type='tel'
                                 name='phone'
                                 value={passenger.mobile}
                                 onChange={(e)=>{dispatch({type: "UDATE_DATA", key: "mobile",id: index,val : e.target.value})}}
                                />
                                
                             </div>
                            </div>: <></> }
                        </div>
                        </div>
                    )
            }
            
                )
              }
      </div>
        </div>
        <div style={{width: "30%",height: "30%"}}>
           <div className='bus-fare' style={{width: "100%"}}>
        <h6>Fare Details</h6>
        <div className='bus-fare-price-flex'>
           <p className='bus-fare-name'>Bus Fare</p>
           <p className='bus-fare-price'>₹{priceBefourTax}</p>
        </div>

        <div className='bus-fare-price-flex'>
           <p className='bus-fare-name'>Tax 18%</p>
           <p className='bus-fare-price'>₹{taxPrice}</p>
        </div>
        <hr />
        <div className='bus-fare-price-flex'>
           <p className='bus-fare-name'>Total Price</p>
           <p className='bus-fare-price'>₹{price}</p>
        </div>
        
        <button className='search-button' style={{width: "100%"}} onClick={onClick}>Proceed to pay</button>
           </div>
        </div>
        <div>

        </div>
         
      </div>
      
      {/*-----------------Enter Traveller Details--------------------*/}
      
      {/*-----------------Enter Traveller Details--------------------*/}
      
      <ToastContainer />
    </div>
  );
}

export default PassangerPage;
