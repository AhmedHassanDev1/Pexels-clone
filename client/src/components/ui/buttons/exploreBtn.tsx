
import { IoIosArrowDown } from "react-icons/io";
import ExploreDropDown from "../dropDowns/exploreDropDown";
function exploreBtn() {
    return (
        <div className="relative group ">
            <div className="group hover:bg-gray-100 rounded-xl p-2 flex gap-1 items-center cursor-pointer">
                <span>Explore</span>
                <IoIosArrowDown
                    className="group-hover:rotate-180 text-gray-400 duration-100"
                />
            </div>
            <ExploreDropDown/>
        </div>
    )
}

export default exploreBtn