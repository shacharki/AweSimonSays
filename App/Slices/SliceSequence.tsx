import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface sequenceState {
  sequence: number[];
}

const initialState: sequenceState = {
  sequence: [],
};

export const sequenceSlice = createSlice({
  name: 'sequence',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      state.sequence = [...state.sequence, action.payload];
    },
    resetUserPoint: (state) => {
      state.sequence = []
    },
  },
});

export const {addItem, resetUserPoint} = sequenceSlice.actions;

export default sequenceSlice.reducer;
