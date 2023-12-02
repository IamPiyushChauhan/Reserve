import React, { useState } from "react";
import AccordionBusesGridSeats from "./accordionBusesComponents/AccordionBusesGridSeats";

const AccordionBuses = ({
  buses,
  seletedBusAndSeat,
  clickedBusAndSeat,
  proceedToBook,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const upperBerth = (seatIndex) => {
    clickedBusAndSeat(activeIndex, seatIndex, true);
  };

  const lowerBerth = (seatIndex) => {
    clickedBusAndSeat(activeIndex, seatIndex, false);
  };

  const upperBerthArray = (seatsDetails) => {
    let arr = seatsDetails.slice(0, 19);
    arr.splice(14, 0, {});
    arr.splice(14, 0, {});
    return arr;
  };

  const lowerBerthArray = (seatsDetails) => {
    let arr = seatsDetails.slice(19, 38);
    arr.splice(14, 0, {});
    arr.splice(14, 0, {});
    return arr;
  };

  const onClickProceed = (index) => {
    proceedToBook(index);
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

  // Example usage
  const timestamp = 1701388800000 + 68400000;
  const formattedDate = convertTimestampToDate(timestamp);

  console.log(formattedDate); // Output: "17 JAN"

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

  const renderedItems = buses.map((bus, index) => {
    const isActive = index === activeIndex;
    console.log(bus);
    const contentClassName = `content ${isActive ? "active" : ""}`;
    //{seletedBusAndSeat[index].seleted_seats.length}
    return (
      <div className="accordion-child" key={index}>
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
            <div
              className="c2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "1px solid black",
              }}
            >
              <h6 style={{ marginBottom: "1px", marginTop: "0px" }}>
                Trip Cost
              </h6>
              <p
                style={{
                  fontWeight: "200",
                  fontSize: "xx-small",
                  color: "gray",
                  marginBottom: "1px",
                }}
              >
                Starting From
              </p>
              <h2 style={{ marginBottom: "1px", marginTop: "0px" }}>
                {bus.seats_details[27].price}
              </h2>
              <button
                onClick={() => onTitleClick(index)}
                style={{
                  backgroundColor: "orange",
                  color: "white",
                  padding: "0.25em",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                View Seats
              </button>
            </div>
          </div>
        </div>

        <div className={contentClassName} >
          <div style={{width: "100%"}}></div>
          <div style={{ display: "flex",width: "100%" }}>
            <div className="berth" style={{width: "80%"}}>
              <p>Upper Berth</p>
              <AccordionBusesGridSeats
                seatClicked={upperBerth}
                data={upperBerthArray(bus.seats_details)}
              />
              <p>Lower Berth</p>
              <AccordionBusesGridSeats
                seatClicked={lowerBerth}
                data={lowerBerthArray(bus.seats_details)}
              />
            </div>

            <div className="seats-details" style={{border: "1px solid black", width:"20%", padding: "0.5em", margin: "0.5em", borderRadius: "5px"}}>
              <h6>Total No Of Seat {seletedBusAndSeat[index].seleted_seats.length}</h6>
              <div style={{  fontSize: "small"}}>
              {seletedBusAndSeat[index].seleted_seats?.map((seletedSeat,index)=>{
                return(
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Seat No: {seletedSeat?.no}</p>
                    <p> ₹ {seletedSeat?.price}</p>
                  </div>
                )})}
              </div>
              <div
            style={{
              visibility:
                seletedBusAndSeat[index].seleted_seats.length === 0
                  ? "hidden"
                  : "visible",
            }}
          >
            <button
            style={{ backgroundColor: "orange",
            color: "white",
            padding: "0.25em",
            borderRadius: "5px",
            border: "none"}}
              onClick={() => {
                onClickProceed(index);
              }}
            >
              Proceed to Book
            </button>
          </div>
              
            </div>
          </div>

          
        </div>
      </div>
    );
  });

  return <div className="accordion">{renderedItems}</div>;
};

export default AccordionBuses;
