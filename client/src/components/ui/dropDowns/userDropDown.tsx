"use client"
import DropDownWrapper from "./dropDownWrapper"
import { userDropDownList } from "@/constants/lists"
import { useAppSelector } from "@/store/store";
import  Link  from "next/link";
import { CiLogout } from "react-icons/ci";
function userDropDown() {
  let {data}=useAppSelector(state=>state.meState)
  
  return (
  
    <DropDownWrapper>
      <div className=" dropDown">
        {userDropDownList.map(el => {
          return <Link
            href={el.title !=='setting'?`/${data._id}${el.href}`:el.href}
            className="drop-down-item"
            key={el.key}
            >
            <el.icon className="text-xl" />
            <span className=" text-nowrap">{el.title}</span>
          </Link>
        })}
      </div>
      <div className="flex items-center gap-2 p-2 md:p-4 text-lg text-zinc-400">
        <CiLogout className="" />
        <span className=" text-nowrap">logout</span>
      </div>
    </DropDownWrapper>

  )
}

export default userDropDown