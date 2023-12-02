import React, { useState,useEffect } from 'react';
import axios from 'axios';
import DropDownList from './locationDropdownComponents/DropDownList';
import DropDownSearch from './locationDropdownComponents/DropDownSearch';
import LoactionButton from './locationDropdownComponents/LoactionButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LocationSearchDropDown({seletedCity,seletedState,getSelectedItem,str}) {
  const [searchedCity,setSearchedCity] = useState("")
  const [cityDataArray , setCityDataArray] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [isLodding, setIsLodding] = useState(false)
  const[locInfo,setLocoInfo] = useState({})
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Set a timeout to update debouncedValue after 500 milliseconds
    
    if(searchedCity!== ""){
    
        const timeoutId = setTimeout(() => {
          setIsLodding(true)
          axios.get('/city', { params: { city_name: searchedCity}})
            .then(response => {
            const cityData = response.data;
            console.log('City Data:', cityData);
            setCityDataArray(cityData)
            setIsLodding(false)
          })
          .catch(error => {
            setIsLodding(false)
            toast.error(`Error fetching city data:`, {
              position: toast.POSITION.TOP_CENTER,
            });
            console.error('Error fetching city data:', error.message);
          });
        }, 1000);

        // Cleanup the timeout on every input change
        return () => {
          clearTimeout(timeoutId);
        };
    }
  }, [searchedCity]);

  function cityItemClicked(item){
    setLocoInfo(item)
    getSelectedItem(item)
    toggleDropdown()
  }
  
  return (
    <div className="dropdown" style={{height: "100%"}}>
      <LoactionButton n={str} city={seletedCity} handleClick={toggleDropdown} state={seletedState}/>
      {isOpen && (
       <div 
       style={{
        position: "absolute",
        top: "100%",
        left: 0,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        maxHeight: "200px",
        overflowY: "auto",
        width: "100%",
        marginTop: "1em",
      }}>
        <div style={{padding: "0.5em"}}>
        <DropDownSearch placeHolder={str} 
                         searchedCity={searchedCity} 
                         setSearchedCityCb={(e)=>{setSearchedCity(e.target.value)}}/>
        </div>
        <hr/>
        {
          (isLodding)? (
                         <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
    )
    : (<DropDownList cityList={cityDataArray} handleClick={cityItemClicked}/>)
        }
         
       </div>
      )}
    </div>
  );
}

export default LocationSearchDropDown;
