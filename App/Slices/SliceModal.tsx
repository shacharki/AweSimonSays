import {createSlice} from '@reduxjs/toolkit';

export interface modalState {
    modalOn: boolean;
}

const initialState: modalState = {
    modalOn: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalOff: (state) => {
      state.modalOn = false
    },
    modalOn: (state) => {
      state.modalOn = true;
    },
  },
});

export const {modalOff, modalOn} = modalSlice.actions;

export default modalSlice.reducer;
