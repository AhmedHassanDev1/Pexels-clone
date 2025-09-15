"use client"

import Image from "next/image"



function imageCard({src}:{src:string}) {
     
  return (
    <div className="w-full h-full relative">
        <Image
         src={src}
         fill
         alt=""
        />
    </div>
  )
}

export default imageCard