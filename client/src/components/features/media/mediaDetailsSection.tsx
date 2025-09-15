
"use client"

import { NumberCompactFormat } from "@/lib/format";
import { mediaInterface } from "@/types/media"
import { useTranslations } from "next-intl"
import Image from "next/image";
import { useRef, useState } from "react"
import { IoClose } from "react-icons/io5";
type mediaDetailsSectionProp = {
  media: mediaInterface,

}

function isHexColor(code: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(code);
}
function mediaDetailsSection({ media }: mediaDetailsSectionProp) {
  let MediaPageT = useTranslations('MediaPage')
  let KeywordT = useTranslations('keyword')

  let modalRef = useRef<HTMLDialogElement>(null)
  let [isOpen, setOpen] = useState(false)
  let { url, title, type, colors, details, createdAt, likes, views, downloads } = media
  let { width, height } = details
  let date = new Date(createdAt)
  let uploadedAt = Intl.DateTimeFormat('en-us', {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date)

  let handleClick = () => setOpen(true)
  
  let close = () => setOpen(false)

  return (
    <div>
      <button
        onClick={handleClick}
        className="min-w-14 flex justify-center items-center gap-2 p-2 rounded-xl border-solid border-2 border-zinc-100 cursor-pointer bg-white duration-100 hover:border-zinc-600 hover:bg-[#7676761e]" >
        {MediaPageT('info')}
      </button>
      {isOpen && <dialog ref={modalRef} className="modal flex  justify-center items-center text-white">
        <div className="">

          <div className="relative z-10 bg-black rounded-t-2xl space-y-3 p-5 ">
            <div
              onClick={close}
              className="w-full text-2xl cursor-pointer">
              <IoClose className=" float-right" />
            </div>
            <div className="flex gap-3 items-center">
              {type === 'image' ?
                <div
                  style={{
                    aspectRatio: width / height
                  }}
                  className="relative w-28 rounded-2xl overflow-hidden">
                  <Image src={url} fill alt={title} objectFit="cover" />
                </div> : null}
              <div className="">
                <h4 className="title-2 text-white">{MediaPageT('photo_delails')}</h4>
                <p className="text-sm text-zinc-300">
                  {MediaPageT('uploaded_at')} {uploadedAt}
                </p>
              </div>
            </div>
            {/* stat */}
            <div className="w-full flex gap-6 items-center p-6">

              <span className="">
                <p className="text-gray-200 text-sm ">{KeywordT('views')}</p>
                <p className="text-lg">{NumberCompactFormat(downloads)}</p>
              </span>
              <span className="">
                <p className="text-gray-200 text-sm ">{KeywordT('likes')}</p>
                <p className="text-lg">{NumberCompactFormat(likes)}</p>
              </span>
              <span className="">
                <p className="text-gray-200 text-sm ">{KeywordT('downloads')}</p>
                <p className="text-lg">{NumberCompactFormat(views)}</p>
              </span>
            </div>
          </div>
          {/* media details */}
          <div className=" relative z-20 -translate-y-3 w-full bg-white  rounded-2xl p-5">
            <div className=" grid grid-cols-4 gap-3  ">
              {width && height && <div className="">
                <span className="text-gray-600 text-sm">Dimensions</span>
                <p className="text-black">{width + 'X' + height}</p>
              </div>}
              <div className="">
                <p className="text-zinc-600 text-sm font-semibold">{KeywordT('colors')}</p>
                <div className="flex w-28 h-2 rounded-full overflow-hidden bg-red-400">
                  {Array.isArray(colors) && colors.map(el => {
                    return isHexColor(el) && <span key={el} className="flex-1" style={{ background: el }}></span>
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </dialog>}
    </div>
  )
}

export default mediaDetailsSection