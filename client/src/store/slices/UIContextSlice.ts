import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    languageSwitcher: {
        isOpen: false
    }
}

let UIContext = createSlice({
    name: 'ui_context',
    initialState,
    reducers: {
        openLanguageSwitcher: (state) => {
            
           state.languageSwitcher.isOpen=true
        },
        closeLanguageSwitcher: (state) => {
           state.languageSwitcher.isOpen=false
        }
    }
})


export const {openLanguageSwitcher,closeLanguageSwitcher}=UIContext.actions
export default UIContext.reducer