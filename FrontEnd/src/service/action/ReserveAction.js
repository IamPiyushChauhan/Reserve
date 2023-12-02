// actions.js
export const SET_FROM_LOCATION = 'SET_FROM_LOCATION';
export const SET_FROM_LOCATION_STATE = 'SET_FROM_LOCATION_STATE'
export const SET_TO_LOCATION = 'SET_TO_LOCATION';
export const SET_TO_LOCATION_STATE = 'SET_TO_LOCATION_STATE';
export const SET_DATE = 'SET_DATE';
export const SET_BUS = 'SET_BUS'
export const SET_SELETED_BUS_AND_IT_SEATS = "SET_SELETED_BUS_AND_IT_SEATS"

export const setFromLocation = (from) => ({
  type: SET_FROM_LOCATION,
  payload: from,
});

export const setFromLocationState = (fromState) => ({
  type: SET_FROM_LOCATION_STATE,
  payload: fromState,
});


export const setToLocation = (to) => ({
  type: SET_TO_LOCATION,
  payload: to,
});

export const setToLocationState = (toState) => ({
  type: SET_TO_LOCATION_STATE,
  payload: toState,
});

export const setDate = (date) => ({
  type: SET_DATE,
  payload: date,
});

export const setBus = (buses) => ({
  type: SET_BUS,
  payload: buses,
});

export const setSelectedBusAndItSeats = (selectedBusAndItSeats) => ({
  type: SET_SELETED_BUS_AND_IT_SEATS,
  payload: selectedBusAndItSeats,
})


