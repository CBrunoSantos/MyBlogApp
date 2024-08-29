import {createSlice} from '@reduxjs/toolkit';

export interface Validation {
  nameProfile : string | null
  emailProfile : string | null
}

const initialState: Validation = {
  nameProfile: null,
  emailProfile: null,
}

const validationSlice = createSlice({
    name: 'validation',
    initialState,
    reducers: {
      setNameProfile: (state,{
        payload
      }) =>{
        state.nameProfile = payload
      },
      setEmailProfile: (state,{
        payload
      }) =>{
        state.emailProfile = payload
      }
    },
});

export const {setNameProfile, setEmailProfile} = validationSlice.actions;
export default validationSlice.reducer;
