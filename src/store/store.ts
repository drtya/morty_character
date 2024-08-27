import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './characterSlice'
import paramsReducer from './paramsSlice'

export const store = configureStore({
  reducer: {
    character:characterReducer,
    params:paramsReducer,
},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch