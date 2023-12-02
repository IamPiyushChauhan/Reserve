import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  setFromLocation,
  setFromLocationState,
  setToLocation,
  setToLocationState,
  setDate,
} from "../service/action/ReserveAction";
import SearchDropDown from "../components/LocationSearchDropDown";
import DateDropDown from "../components/DateDropDown";


function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fromLocation, fromLocationState, toLocation, toLocationState, date } =
    useSelector((state) => state);

  const handleDateChange = (e) => {
    dispatch(setDate(e.target.value));
  };

  const handleFormChange = (item) => {
    dispatch(setFromLocation(item.city));
    dispatch(setFromLocationState(item.state));
  };

  const handleToChange = (item) => {
    dispatch(setToLocation(item.city));
    dispatch(setToLocationState(item.state));
  };

  const handleSearchClicked = async () => {
    if (
      fromLocation !== "" &&
      fromLocationState !== "" &&
      toLocation !== "" &&
      toLocationState !== "" &&
      date !== ""
    ) {
      navigate("/buses");
    } else {
      toast.error('Please Enter All the details', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="home-page">
     
      <div>
      <div className="centered-container">
        <div className="flex-container">
          <div
            className="dropdown-container"
            style={{
              border: "0.5px solid black",
              borderRadius: "0.938rem 0px 0px 0.938rem",
            }}
          >
            <SearchDropDown
              seletedCity={fromLocation}
              seletedState={fromLocationState}
              getSelectedItem={handleFormChange}
              str={"From"}
            />
          </div>
          <div
            className="dropdown-container"
            style={{ border: "0.5px solid black" }}
          >
            <SearchDropDown
              seletedCity={toLocation}
              seletedState={toLocationState}
              getSelectedItem={handleToChange}
              str={"To"}
            />
          </div>
          <div
            className="dropdown-container"
            style={{
              border: "0.5px solid black",
              borderRadius: "0px 0.938rem 0.938rem 0px",
            }}
          >
            <DateDropDown
              selectedDate={date}
              handleDateChange={handleDateChange}
            />
          </div>
        </div>
        <div className="search-button-div">
          <button className="search-button" onClick={handleSearchClicked}>
            Search
          </button>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
}

export default HomePage;
