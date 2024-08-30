import {createSlice} from '@reduxjs/toolkit';

export interface Validation {
  nameProfile : string | null
  usernameProfile : string | null
}

const initialState: Validation = {
  nameProfile: null,
  usernameProfile: null,
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
      setUsernameProfile: (state,{
        payload
      }) =>{
        state.usernameProfile = payload
      }
    },
});

export const {setNameProfile, setUsernameProfile} = validationSlice.actions;
export default validationSlice.reducer;
