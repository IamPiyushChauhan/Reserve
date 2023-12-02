import React from "react";

const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color="#5A5A5A"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );


function DropDownSearch({placeHolder, searchedCity,setSearchedCityCb}) {
  
  return (
    <div className='dropdown-input-div'>
        <SearchIcon />
        <input className='dropdown-input' placeholder={placeHolder} value={searchedCity} onChange={setSearchedCityCb} />
    </div>
  );
}

export default DropDownSearch;
