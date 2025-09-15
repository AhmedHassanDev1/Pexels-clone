"use client"
import Logo from "@/components/ui/logo"
import HeaderLeft from "./HeaderLeft"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "@/store/slices/CurrrentuserSlice"
import { AppDispatch } from "@/store/store"

function Header() {
   let dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{
       dispatch(getCurrentUser())
       
             
    },[])

    return (
        <header className="max-w-full h-20 p-2 py-4 sticky top-0 flex justify-center bg-white border-b-[1px] border-solid border-gray-200   z-50">
            <div className="w-[95%] flex justify-between items-center">
                <Logo />
                <HeaderLeft/>
            </div>
        </header>
    )
}

export default Header