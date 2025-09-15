"use client"
import {  openLanguageSwitcher } from "@/store/slices/UIContextSlice";
import { IoLanguageSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";

function languageBtn() {
  let dispatch=useDispatch()
  let handleOpenLanguageSwicher=()=>{
     dispatch(openLanguageSwitcher())
  }
  return (
    <div
     className="text-xl cursor-pointer rounded-full hover:bg-gray-100 p-2"
     onClick={handleOpenLanguageSwicher}
    >
        <IoLanguageSharp />
    </div>
  )
}

export default languageBtn