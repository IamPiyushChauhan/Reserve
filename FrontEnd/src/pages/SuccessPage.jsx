
import React, { useEffect,useState } from 'react';
// import axios from 'axios';
function SuccessPage() {
  const [bus,setBus] = useState({})
  const [passangers, setPassangers] = useState([])
  const [apiData,setApiData] = useState([])
  const [ticketID,setTiketID] = useState([])

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

  useEffect(()=>{
    let ticketId =  window.localStorage.getItem('ticket_id')
    console.log(ticketId)
    setTiketID(ticketId)
    const fetchData = async () => {
      try {
        const response = await fetch(`https://reserve-backend-la7a.onrender.com/passanger-ticket-info?ticket_id=${ticketId}`);

        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
       console.log(data);
       setApiData(data)
       setPassangers(data[0].passanger_details)
       const busID = data[0].bus_and_seats._id
       console.log("Bus Id"+busID)

       const response2 = await fetch(`https://reserve-backend-la7a.onrender.com/bus/find-by-id?id=${busID}`);

        if (!response2.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        const busData = await response2.json()
        console.log("BUS DATA")
        console.log(busData)
        setBus(busData[0])

      } catch (error) {
        console.error('Error:', error);
        // Handle errors as needed, such as setting an error state
      }
    };

    fetchData();
  
  },[])
  if(apiData.length === 0){
  return(
   <div style={{height: "100vh",display: "flex", alignItems: "center", justifyContent: "center"}}>
    <h1>No Ticket Found</h1>
  </div>)
  }else{
  return (
    <div style={{height: "100vh",display: "flex", alignItems: "center", justifyContent: "center"}}>

    <div style={{textAlign: "center", width: "50em" , height: "max-content" , border: "1px solid #ddd",padding: "1em",borderRadius: "5px"}}>
      
      <img src={'/green-check-mark-verified-circle.png'} height="75vh" width="75vw" alt="Example" />
      
      <h2>Booking has been confirmed</h2>
      <h4>TicketID:  {ticketID}</h4>
      <p>Passanger Details {}</p>
      {
        passangers.map((p,i)=>{
          return  <p>Passanger {i+1} : Seat {p.no} {p.type}:  {p.name} {p.age} {p.gender}</p>})
      }
      <p>Contact Details : {passangers[0]?.mobile}</p>
      <div className='BUS-DETAIL' >
        <div className="title">
          
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
                
              </div>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
    </div>
  );
  }
}

export default SuccessPage;
