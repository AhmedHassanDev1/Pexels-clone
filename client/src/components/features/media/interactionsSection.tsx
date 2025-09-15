"use client"
import LikeBtn from "@/components/ui/buttons/likeBtn"
import CollectionBtn from "@/components/ui/buttons/CollectionBtn"
import DownloadBtn from "@/components/ui/buttons/DownloadBtn"
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useParams } from "next/navigation"
import { mediaInterface } from "@/types/media";
import { NumberCompactFormat } from "@/lib/format";

function interactionsSection({media}:{media:mediaInterface}) {
  let { id: mediaId } = useParams()
  let {is_like,likes}=media || {}
  return (
    <div className="">
      <LikeBtn likesCount={likes} mediaId={mediaId as string} Liked={is_like} >
        {(isLike,likesCount) => (
         <div className={`min-w-14 flex justify-center items-center gap-2 p-2 rounded-xl border-solid border-2 border-zinc-100 cursor-pointer bg-white duration-100 hover:border-zinc-600 hover:bg-[#7676761e]`}>
            {isLike?<FaHeart/>:<FaRegHeart/>}
            {NumberCompactFormat(likesCount)}
         </div>
        )}
      </LikeBtn>
    </div>
  )
}

export default interactionsSection