import { combineReducers } from '@reduxjs/toolkit'
import { AdminSlice, UserSlice } from '../actions'
export const rootReducer = combineReducers({
    admin: AdminSlice.reducer,
    user: UserSlice.reducer,
})
