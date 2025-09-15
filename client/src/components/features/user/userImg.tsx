import Image from "next/image"
import UserDropDown from "@/components/ui/dropDowns/userDropDown"
import { useAppSelector } from "@/store/store";

function userImg() {
  let  user=useAppSelector(state=>state.meState);
  
  let url=user.data?.profile_image;

  url = url || '/userDefaultImg.png'

  return (
    <div className="relative group py-2">
      <div className='relative w-10 h-10 ring-gray-200 hover:ring-2 cursor-pointer rounded-full  '>
        <Image
          className="absolute w-full h-full rounded-full"
          src={url}
          width={50}
          height={50}
          objectFit="cover"
          objectPosition="center"
          alt="user image" />
      </div>
      <UserDropDown />
    </div>
  )
}

export default userImg