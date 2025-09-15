"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { MdOutlineClose } from "react-icons/md";
import UserSection from "@/components/features/media/userSection";
import InteractionsSection from "@/components/features/media/interactionsSection";
import { useQuery } from "@tanstack/react-query";
import { getMediaById } from "@/lib/api/content";
import MediaContainer from "@/components/features/media/MediaContainer";
import { useTranslations } from "next-intl";
function page() {
  let { id } = useParams()
  

  let { data } = useQuery({
    queryKey: ['media', id],
    queryFn: () => getMediaById(id as string),
    enabled: !!id
  })
  let router = useRouter()
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'

    }
  }, [])
  return (
    <dialog open className='modal flex justify-center p-10 gap-5 overflow-y-auto'>
      <div className="w-full max-w-7xl   ">
        <div className="text-3xl text-white cursor-pointer p-2" onClick={() => router.back()}>
          <MdOutlineClose />
        </div>
        <div className="w-full   bg-white rounded-3xl p-10">
          {/* user and interactions section */}
          <div className="flex justify-between">
            <UserSection userId={data?.data?.user} />
            <InteractionsSection media={data?.data} />
          </div>
          <div className="">
            {data?.data && <MediaContainer media={data?.data} />}
          </div>
           
        </div>
      
    </div>

    </dialog>
  )
}

export default page