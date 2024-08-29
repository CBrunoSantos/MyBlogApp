import {combineReducers} from '@reduxjs/toolkit';
import validationSlice from './validation';

const rootReducer = combineReducers({
  validation:validationSlice
});

export default rootReducer;
