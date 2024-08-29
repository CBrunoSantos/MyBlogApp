import {createSlice} from '@reduxjs/toolkit';

export interface Validation {
  validated: string | null
  name : string | null
}

const initialState: Validation = {
  validated:null,
  name: null,
}

const validationSlice = createSlice({
    name: 'validation',
    initialState,
    reducers: {
      setValidated: (state,{
        payload
      }) =>{
        state.validated = payload
      },
      setName: (state,{
        payload
      }) =>{
        state.name = payload
      }
    },
});

export const {setValidated, setName} = validationSlice.actions;
export default validationSlice.reducer;
