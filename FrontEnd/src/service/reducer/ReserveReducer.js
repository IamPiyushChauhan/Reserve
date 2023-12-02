// reducer.js
import { SET_FROM_LOCATION,
  SET_FROM_LOCATION_STATE,
   SET_TO_LOCATION,
   SET_TO_LOCATION_STATE, 
   SET_DATE, 
   SET_BUS,
   SET_SELETED_BUS_AND_IT_SEATS } from '../action/ReserveAction';

const initialState = {
  fromLocation: '',
  fromLocationState: '',
  toLocation: '',
  toLocationState: '',
  date: '',
  bus: {},
  seletedBusAndSeat: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FROM_LOCATION:
      return {
        ...state,
        fromLocation: action.payload,
      };
      case SET_FROM_LOCATION_STATE:
      return {
        ...state,
        fromLocationState: action.payload,
      };
    case SET_TO_LOCATION:
      return {
        ...state,
        toLocation: action.payload,
      };
      case SET_TO_LOCATION_STATE:
      return {
        ...state,
        toLocationState: action.payload,
      };
    case SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case SET_SELETED_BUS_AND_IT_SEATS: 
      return {
        ...state,
        seletedBusAndSeat: action.payload
      }
    
    case SET_BUS:
      return {
        ...state,
        bus: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
