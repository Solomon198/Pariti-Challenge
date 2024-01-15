import { combineReducers } from '@reduxjs/toolkit'
import { AdminSlice } from '../actions'
export const rootReducer = combineReducers({
    admin: AdminSlice.reducer,
})
