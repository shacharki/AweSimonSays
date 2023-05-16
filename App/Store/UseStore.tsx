import { configureStore } from '@reduxjs/toolkit'
import sequenceReducer from '../Slices/SliceSequence'
import simonReducer from '../Slices/SliceSimon'
import modalReducer from '../Slices/SliceModal'

export const store = configureStore({
  reducer: {
    user: sequenceReducer,
    simon: simonReducer,
    modalName: modalReducer

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch