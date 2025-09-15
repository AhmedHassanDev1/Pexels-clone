import {configureStore} from "@reduxjs/toolkit"
import useReducer from "./slices/CurrrentuserSlice"
import UIContextReducer from "./slices/UIContextSlice"
import { TypedUseSelectorHook, useSelector } from "react-redux"
const store=configureStore({
     reducer:{
       meState:useReducer,
       UIContext:UIContextReducer
     },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store 