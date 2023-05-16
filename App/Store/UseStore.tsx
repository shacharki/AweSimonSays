import { configureStore } from '@reduxjs/toolkit'
import sequenceReducer from '../Slices/SliceSequence'
import simonReducer from '../Slices/SliceSimon'

export const store = configureStore({
  reducer: {
    user: sequenceReducer,
    simon: simonReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch