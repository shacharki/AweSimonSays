import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface sequenceState {
  currentColor: number;
}

const initialState: sequenceState = {
  currentColor: -1,
};

export const simonSlice = createSlice({
  name: 'simon',
  initialState,
  reducers: {
    addColor: (state, action: PayloadAction<number>) => {
      state.currentColor = action.payload;
    },
  },
});

export const {addColor} = simonSlice.actions;

export default simonSlice.reducer;
