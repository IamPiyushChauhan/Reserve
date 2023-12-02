// store.js
import { createStore } from 'redux';
import reducer from '../reducer/ReserveReducer';

const store = createStore(reducer);

export default store;
