import { combineReducers } from '@reduxjs/toolkit';
import uberSlice from './uberSlice';

const rootReducer = combineReducers({
  uber: uberSlice,
});

export default rootReducer;
