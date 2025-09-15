import Link from "next/link"
import DropDownWrapper from "./dropDownWrapper"
import { exploreDropDownList } from "@/constants/lists"
function exploreDropDown() {
  return (
    <DropDownWrapper>
        <div className=" border-b-[1] border-gray-200 border-solid p-2  text-lg text-zinc-800">
           {exploreDropDownList.map(el=>{
             return <Link 
                   href={el.href}
                    className="drop-down-item"
                    key={el.key}
                    >
                    <el.icon/>
                    <span className="">{el.title}</span>
             </Link>
           })}
        </div>
    </DropDownWrapper>
  )
}

export default exploreDropDown